var BaseRes = require('./base_res')
  , _ = require('underscore')
  , CandidateStore = require('../sdk/sqlcandidatestore.js')
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

  showCandidateAdd : function (req, res) {
    var store = new CandidateStore();
    store.getPositions( function (err, positions) {
      debugger;
      res.render('app/addcandidate' , {positions : positions});
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
      debugger;
      var grouped = _.groupBy(candidates.results , function (can) {
        return  can.state.name;
      });

      var results = [];
      for(var state in grouped) {
        results.push({
          name : state,
          candidates : grouped[state]
        });
      }

      grouped = _.sortBy (results, function (group) {
        return group.candidates[0].state.order;
      });

      store.getStates( function (err, states) {
        var all_states = states;
        res.render('app/home' , { candidates : grouped, all_states : all_states});
      });

      
    });
  },

  ensureAuthenticated : function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
});
