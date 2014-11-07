var BaseRes = require('./base_res')
  , _ = require('underscore')
  , CandidateStore = require('../sdk/sqlcandidatestore.js')
  , KeenStore = require('../sdk/keenstore.js')
  , csv = require('fast-csv')
  , fs = require('fs');

var CandidateRest = module.exports = BaseRes.extend({
  route: function (app) {
    app.get('/', this.ensureAuthenticated, _.bind(this.home, this));
    app.get('/login', _.bind(this.login, this));
    //app.post('/load', this.ensureAuthenticated, _.bind(this.load, this));
	  app.post('/load', _.bind(this.load, this));
	  app.get('/import', this.ensureAuthenticated, _.bind(this.upload, this));
    app.get('/candidate/add', this.ensureAuthenticated, _.bind(this.showCandidateAdd, this));
    app.post('/candidate/add', this.ensureAuthenticated, _.bind(this.addCandidate, this));
    app.post('/candidate/changestate', this.ensureAuthenticated, _.bind(this.changeState, this));
    app.post('/positions/add', this.ensureAuthenticated, _.bind(this.addNewPosition, this));
    app.post('/candidate/changeowner',  this.ensureAuthenticated, _.bind(this.changeOwner, this));
    app.post('/candidate/changeduedate', this.ensureAuthenticated,  _.bind(this.changeDueDate, this));
    app.post('/candidate/changenote', this.ensureAuthenticated, _.bind(this.changeNote, this));
    app.post('/funnelStats', this.ensureAuthenticated, _.bind(this.funnelStats, this));
  },


  addCandidate : function (req,res) {
    var store = new CandidateStore();
    store.addCandidate(req.body, function (candidate) {
      res.redirect('/');
    });
  },

  changeState : function (req,res) {
    var store = new CandidateStore();
    store.changeCandidateState(req.body, function (candidate) {
      res.redirect('/');
    });
  },

  changeOwner : function (req,res) {
    var store = new CandidateStore();
    store.changeCandidateOwner(req.body, function (candidate) {
      res.redirect('/');
    });
  },

  changeDueDate : function (req,res) {
    var store = new CandidateStore();
    store.changeCandidateDueDate(req.body, function (candidate) {
      res.redirect('/');
    });
  },

  changeNote : function (req,res) {
    var store = new CandidateStore();
    store.changeCandidateNote(req.body, function (candidate) {
      res.redirect('/');
    });
  },

  funnelStats : function (req,res) {
    var rec = req.body['Recruiter_PersonId'];
    var keenStore = new KeenStore();
    keenStore.getOverallStageFunnel(rec, function(data) {
      var overallStats = data;
      keenStore.getWeeklyStageFunnel(rec, function(data) {
        var weeklyStats = data;
        res.send({ overallFunnelStats : overallStats, weeklyFunnelStats : weeklyStats});
      });
    });
  },

  showCandidateAdd : function (req, res) {
    var store = new CandidateStore();
    store.getPositions( function (err, positions) {
      var pos = positions;

      store.getRecruiters( function(err, recruiters) {
        var recs = recruiters;
        store.getPersons( function(err, persons) {
          var pers = persons;
          res.render('app/addcandidate' , {positions : pos,  recruiters : recs, owners : pers });
        });
      });
    });
  },

  login: function (req, res) {
    res.render('app/login');
  },

  upload: function (req, res) {
	res.render('app/import', {candidates : null});
  },

  addNewPosition : function (req, res) {
    var store = new CandidateStore();
    store.addPosition(req.body, function (position) {
      res.json(position);
    });
  },

  load: function (req, res){
	console.log(req.files);
	
	
	var stream = fs.createReadStream(req.files.csvinput.path);
	
	csv.fromStream(stream, {headers : true})
		.on("data", function(data){
			console.log(data);
			
		})
		.on("end", function(){
			console.log("done");
		});

      res.render('app/import');
  },

  home : function (req,res) {
    var store = new CandidateStore();
    store.getCandidates( function (err, candidates) {
      var filtered = candidates.results;
      if(req.query.rec && req.query.rec != "all"){
        console.log("filter: " +req.query.rec);
        filtered = _.filter(candidates.results, function (can){ 
          return can.Recruiter_PersonId == req.query.rec; 
        });
      }
      if(req.query.own && req.query.own != "all"){
        filtered = _.filter(filtered, function (can){ return can.Owner_PersonId == req.query.own; });
      }

      var grouped = _.groupBy(filtered , function (can) {
        return  can.state.name;
      });

      var results = [];
      for(var state in grouped) {
        results.push({
          name : state,
          id : grouped[state][0].State_Id,
          candidates : grouped[state]
        });
      }

      grouped = _.sortBy (results, function (group) {
        return group.candidates[0].state.order;
      });

      store.getStates( function (err, states) {
        var all_states = states;
        store.getRecruiters( function (err, recruiters) {
          store.getPersons( function (err, persons) {
            res.render('app/home' , { persons : persons, recruiters : recruiters, candidates : grouped, all_states : all_states });
          });
        });
      });
    });
  },

  ensureAuthenticated : function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
});
