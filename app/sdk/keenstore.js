var klass = require('klass')
  , _ = require('underscore')
var Keen = require("keen.io");

var KeenStore = module.exports = klass(function () {

  // constructor
}).methods({
    getOverallStageFunnel : function (done) {
      var client = this.__configureClient();
      var definition = this.__getFunnelDefinition();

      client.run(definition, function(err, response) {
        if (err) return done([]);
        var priorStep = response.result[0];
        var steps = [100];
        var trans = response.result.slice(1);
        trans.forEach(function(value) {
          var percent = (value/priorStep) * 100;
          steps.push(percent);
          priorStep = value;
        });
        done(steps);
      });
    },

    sendStatusMsg : function(statusMsg, done) {
      var client = this.__configureClient();

      client.addEvents(statusMsg, function(err, res) {
        if(err)
        {
          console.log('error sending status message...')
        }
        console.log('Change Status Event Sent')
        console.log(statusMsg);
        done();
      });
    },

    createLeadMsg : function(canidateId, recruiter, timeForStateChange) {
      return { "canidate_lead" : [{"CanidateId" : canidateId}, {"Recruiter" : recruiter}, {"Time taken:" : timeForStateChange}] }
    },

    createScreenMsg : function(canidateId, recruiter, timeForStateChange) {
      return { "canidate_screen" : [{"CanidateId" : canidateId}, {"Recruiter" : recruiter}, {"Time taken:" : timeForStateChange}] }
    },

    createInterviewMsg : function(canidateId, recruiter, timeForStateChange) {
      return { "canidate_interview" : [{"CanidateId" : canidateId}, {"Recruiter" : recruiter}, {"Time taken:" : timeForStateChange}] }
    },

    createOfferMsg : function(canidateId, recruiter, timeForStateChange) {
      return { "canidate_offer" : [{"CanidateId" : canidateId}, {"Recruiter" : recruiter}, {"Time taken:" : timeForStateChange}] }
    },

    createAcceptedMsg : function(canidateId, recruiter, timeForStateChange) {
      return { "canidate_accepted" : [{"CanidateId" : canidateId}, {"Recruiter" : recruiter}, {"Time taken:" : timeForStateChange}] }
    },

    createRejectedMsg : function(canidateId, recruiter, timeForStateChange) {
      return { "canidate_rejected" : [{"CanidateId" : canidateId}, {"Recruiter" : recruiter}, {"Time taken:" : timeForStateChange}] }
    },

    createWithdrawnMsg : function(canidateId, recruiter, timeForStateChange) {
      return { "canidate_withdrawn" : [{"CanidateId" : canidateId}, {"Recruiter" : recruiter}, {"Time taken:" : timeForStateChange}] }
    },

    __getFunnelDefinition  : function () {
      var funnel = new Keen.Query('funnel', {
        steps: [
          {
            event_collection: "canidate_lead",
            actor_property: "CanidateId"
          },
          {
            event_collection: "canidate_screen",
            actor_property: "CanidateId"
          },
          {
            event_collection: "canidate_interview",
            actor_property: "CanidateId"
          },
          {
            event_collection: "canidate_offer",
            actor_property: "CanidateId"
          },
          {
            event_collection: "canidate_accepted",
            actor_property: "CanidateId"
          }
        ],
        timeframe: "this_6_months"
      });
      return funnel;
    },

    __configureClient : function() {
      return Keen.configure({
      projectId: "54512ae6bcb79c13c6edbc1c",
      writeKey: "148dd9d1b1c4f762d2b0a695ee158788147d83808277447b8ab051927f7c17f9c52301a74ceab2606df3608ba39d5ba8f94f21c2795ab3ad5e03317a89053238795ac86b62b2e59a57194727397a545901d617425c851922c26a4a4910f870de190f1932accfbf756f2a6540505b6f02",
      readKey: "9272e4b925cb74c46d43a6803c92e5058e46574b53dacab489ed112376e766d54e963a0a207c6e7e2c57fc5d29827675e83271a79c0a27449a4e085c47177e4640afe1f807755b2ab9334af99d1aab5fa31c0bdd8ca3d5b84f2de0c7d54d8701c8c6b5c3e15075cbd6c55e1af7182a98"
    });
    }
});
