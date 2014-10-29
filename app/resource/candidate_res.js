var BaseRes = require('./base_res')
  , _ = require('underscore')
  , CandidateStore = require('../sdk/candidatestore.js');

var CandidateRest = module.exports = BaseRes.extend({
  route: function (app) {
    app.get('/', this.ensureAuthenticated, _.bind(this.home, this));
    app.get('/login', _.bind(this.login, this));
    app.get('/load', this.ensureAuthenticated, _.bind(this.load, this));
    app.get('/candidate/add', this.ensureAuthenticated, _.bind(this.showCandidateAdd, this));
    app.post('/candidate/add', this.ensureAuthenticated, _.bind(this.addCandidate, this));
  },


  addCandidate : function (req,res) {
    var store = new CandidateStore();
    store.addCandidate(req.body, function (candidate) {
      
    });
  },

  showCandidateAdd : function (req, res) {
    var store = new CandidateStore();
    store.getPositions( function (positions) {
      res.render('app/addcandidate.html' , {positions : positions.results});
    });
  },

  login: function (req, res) {
    res.render('app/login');
  },

  load: function (req, res){
    var store = new CandidateStore();
    store.getCandidates( function (candidates) {
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

      debugger;
      grouped = _.sortBy (results, function (group) {
        return group.candidates[0].state.order;
      });

      debugger;
      res.render('app/import' , { candidates : grouped});
    });
  },

  home : function (req,res) {
    var store = new CandidateStore();
    store.getCandidates( function (candidates) {
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

      debugger;
      grouped = _.sortBy (results, function (group) {
        return group.candidates[0].state.order;
      });

      debugger;
      res.render('app/home' , { candidates : grouped});
    });
  },

  ensureAuthenticated : function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
});
