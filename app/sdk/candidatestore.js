var klass = require('klass')
  , mysql = require('mysql')
  , _ = require('underscore')
  , crypto = require('crypto');

var CandidateStore = module.exports = klass(function () {

  // constructor
}).methods({
    getCandidates : function (done) {
      var r = {
        results:
        [
          {
            firstName : "Phani",
            lastName : "Raj",
            state : {
              name : "Lead",
              icon : "icon-inbox",
              order : 0
            }
          },
          {
            firstName : "Travis",
            lastName : "Plummer",
            state : {
                name : "Interview" ,
                icon : "icon-user",
                order : 2
              }
          },
          {
            firstName : "Sam",
            lastName : "Gazitt",
              state : {
                name : "Phone Screen" ,
                icon : "icon-phone-alt",
                order : 1
              }
          },
          {
            firstName : "Sam",
            lastName : "Choi",
              state : {
                name : "Offer" ,
                icon : "icon-us",
                order : 4
              }
          },
          {
            firstName : "Wayne",
            lastName : "Foley",
              state : {
                name : "Lead" ,
                icon : "icon-inbox",
                order : 0
              }
          }
        ]
      };

      var self = this;

      var enc = [];
      _.each(r.results, function (can,i ) {
        enc.push( self.__encryptCandidate(can));
      });

      var dec = [];

      _.each(enc, function (can,i ) {
        dec.push( self.__decryptCandidate(can));
      });

      done( { results : dec});
    },

    __encryptCandidate : function (candidate) {
      candidate.firstName = this.__encrypt(candidate.firstName);
      candidate.lastName = this.__encrypt(candidate.lastName);
      /*candidate.email = this.__encrypt(candidate.email);
      candidate.tagLine = this.__encrypt(candidate.tagLine);*/
      return candidate;
    },

    __decryptCandidate : function (candidate) {
      candidate.firstName = this.__decrypt(candidate.firstName);
      candidate.lastName = this.__decrypt(candidate.lastName);
      /*candidate.email = this.__decrypt(candidate.email);
      candidate.tagLine = this.__decrypt(candidate.tagLine);*/
      return candidate;
    },

    __encrypt : function (text) {
      var passPhrase = this.__getPassPhrase();
      var cipher = crypto.createCipher('aes-256-cbc', passPhrase);
      var crypted = cipher.update(text,'utf8','hex');
       crypted += cipher.final('hex');
      return crypted;
    },

    __decrypt : function (crypted) {
      var passPhrase = this.__getPassPhrase();
      var decipher = crypto.createDecipher('aes-256-cbc', passPhrase);
      var dec = decipher.update(crypted,'hex','utf8');
      dec += decipher.final('utf8');
      return dec;
    },

    __getPassPhrase : function () {
      return "PhaniRaj";
    }
});
