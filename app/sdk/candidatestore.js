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
            name : "Phani Raj",
            state : {
              name : "Lead",
              icon : "icon-inbox",
              order : 0
            }
          },
          {
            name : "Travis Plummer",
            state : {
                name : "Interview" ,
                icon : "icon-user",
                order : 2
              }
          },
          {
            name : "Sam Gazitt",
              state : {
                name : "Phone Screen" ,
                icon : "icon-phone-alt",
                order : 1
              }
          },
          {
            name : "Sam Choi",
              state : {
                name : "Offer" ,
                icon : "icon-us",
                order : 4
              }
          },
          {
            name : "Wayne Foley",
              state : {
                name : "Lead" ,
                icon : "icon-inbox",
                order : 0
              }
          }
        ]
      });
    }
});
