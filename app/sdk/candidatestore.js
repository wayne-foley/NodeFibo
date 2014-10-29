var klass = require('klass')
  , mysql = require('mysql');

var CandidateStore = module.exports = klass(function () {

  // constructor
}).methods({
    getCandidates : function (done) {
      done({
        results:
        [
          {
            name : "Lead" ,
            icon : "icon-inbox",
            candidates : [
            {
              name : "Phani Raj"
              ]
            },
            {
              name : "Travis Plummer"
            },
            {
              name : "Travis Plummer"
            }]
          },
          {
            name : "Phone Screen",
            icon : "icon-phone",
            candidates : [
            {
              name : "Phani Raj"
            },
            {
              name : "Travis Plummer"
            },
            {
              name : "Travis Plummer"
            }]
          },
          {
            name : "Interview",
            icon : "icon-user",
            candidates : [
            {
              name : "Phani Raj"
            },
            {
              name : "Travis Plummer"
            },
            {
              name : "Travis Plummer"
            }]
          },
          {
            name : "Offer",
            icon : "icon-usd",
            candidates : [
            {
              name : "Phani Raj"
            },
            {
              name : "Travis Plummer"
            },
            {
              name : "Travis Plummer"
            }]
          }
        ]
      });
    }
});
