var klass = require('klass')
  , MySqlStore = require('./mysqlstore')
  , _ = require('underscore')
  , crypto = require('crypto');

var SQLCandidateStore = module.exports = klass(function () {

  // constructor
}).methods({
    getCandidates : function (done) {
      var sqlStore = new MySqlStore(),
      self = this;
      sqlStore.callStoredProcedure('uspGetCandidates' , function (err, encryptedResults) {
        var results = [];
        _.each(encryptedResults, function(res,index) {
            res.state = {
              name : res.State_Name,
              order : res.State_Order
            };
            results.push(self.__decryptCandidate(res));
          });

        done(err,{ results : results});
      });
    },


    getPositions  : function (done) {
      var sqlStore = new MySqlStore(),
        self = this;
        sqlStore.callStoredProcedure("uspGetPositions", function (err, positions) {
          done(err, positions);
        });
    },

    getStates  : function (done) {
      var sqlStore = new MySqlStore(),
        self = this;
        sqlStore.callStoredProcedure("uspGetStates", function (err, states) {
          done(err, states);
        });
    },

    addCandidate : function(candidate, done) {
      var encryptedCandidate = this.__encryptCandidate(candidate);
      var sqlStore = new MySqlStore(),
      self = this;
      sqlStore.callStoredProcedure("uspInsertCandidate("
        +"'"+encryptedCandidate.firstName+"', "
        +"'"+encryptedCandidate.lastName+"' ,"
        +"'"+encryptedCandidate.email+"', "
        +"'"+encryptedCandidate.tagLine+"', "
        +"'"+encryptedCandidate.position+"', "
        +"'"+encryptedCandidate.tagLine+"'"
      +")" , function (err, encryptedResults) {
        var results = [];
        _.each(encryptedResults, function(res,index) {
            results.push(self.__decryptCandidate(res));
          });

        done(err,{ results : results});
      });
    },

    changeCandidateState : function(candidate, done) {
      var sqlStore = new MySqlStore(),
      self = this;
      sqlStore.callStoredProcedure("uspChangeState("
        +"'"+candidate.id+"', "
        +"'"+candidate.stateId+"'"
      +")" , function (err, encryptedResults) {
        var results = [];
        _.each(encryptedResults, function(res,index) {
            results.push(self.__decryptCandidate(res));
          });

        done(err,{ results : results});
      });
    },

    addPosition : function(position, done) {
      var sqlStore = new MySqlStore(),
      self = this;
      sqlStore.callStoredProcedure("uspInsertPosition("
        +"'"+position.name+"', "
        +"'"+position.description+"' ,"
        +"'"+position.reqLink+"'"
        +")",
        function (err, results) {
          debugger;
          done(err, { results : results});
        });
    },

    __encryptCandidate : function (candidate) {
      candidate.firstName = this.__encrypt(candidate.firstName ||candidate.FirstName );
      candidate.lastName = this.__encrypt(candidate.lastName || candidate.LastName);
      candidate.tagLine = this.__encrypt(candidate.tagLine || candidate.TagLine);
      candidate.email = this.__encrypt(candidate.email || candidate.EmailAddress);
      return candidate;
    },

    __decryptCandidate : function (candidate) {
      candidate.firstName = this.__decrypt(candidate.firstName ||candidate.FirstName );
      candidate.lastName = this.__decrypt(candidate.lastName || candidate.LastName);
      candidate.tagLine = this.__decrypt(candidate.tagLine || candidate.TagLine);
      candidate.email = this.__decrypt(candidate.email || candidate.EmailAddress);
      return candidate;
    },

    __encrypt : function (text) {
      text = text || "";
      var passPhrase = this.__getPassPhrase();
      var cipher = crypto.createCipher('aes-256-cbc', passPhrase);
      var crypted = cipher.update(text,'utf8','hex');
       crypted += cipher.final('hex');
      return crypted;
    },

    __decrypt : function (crypted) {
      crypted = crypted ||"";
      var passPhrase = this.__getPassPhrase();
      var decipher = crypto.createDecipher('aes-256-cbc', passPhrase);
      var dec = decipher.update(crypted,'hex','utf8');
      dec += decipher.final('utf8');
      return dec;
    },

    __getPassPhrase : function () {
      return process.env.passPhrase;
    }
});
