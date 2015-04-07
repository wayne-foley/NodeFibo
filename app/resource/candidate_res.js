var BaseRes = require('./base_res')
  , _ = require('underscore')

function fib(x) {
    if (x === 0) {
        return 0;
    } else if (x === 1) {
        return 1;
    } else {
        return fib(x-1)+fib(x-2);
    }
}

var CandidateRest = module.exports = BaseRes.extend({
  route: function (app) {
    app.get('/',  _.bind(this.fibo, this));
    app.get('/fibo', _.bind(this.fibo, this));
    app.get('/fibo/:num', _.bind(this.fiboNum, this));
  },



  fibo : function (req,res) {
    res.render('app/index' , {number : 15, value:fib(15)});
  },

  fiboNum : function(req, res) {
    res.render('app/index' , {number : req.params.num, value:fib(req.params.num)});
  }
});
