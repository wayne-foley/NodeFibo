var BaseRes = require('./base_res')
  , _ = require('underscore')
  , CandidateStore = require('../sdk/candidatestore.js');

var CandidateRest = module.exports = BaseRes.extend({
  route: function (app) {
    app.get('/', _.bind(this.home, this));
  },

  all: function (req, res) {
    res.render('app/index');
  },

  home : function (req,res) {
    var store = new CandidateStore();
    store.getCandidates( function (candidates) {
      debugger;
      res.render('app/home' , { candidates : candidates.results});
    });
  }
});
