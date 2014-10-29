var Keen = require("keen.io");
var client = Keen.configure({
    projectId: "54512ae6bcb79c13c6edbc1c",
    writeKey: "148dd9d1b1c4f762d2b0a695ee158788147d83808277447b8ab051927f7c17f9c52301a74ceab2606df3608ba39d5ba8f94f21c2795ab3ad5e03317a89053238795ac86b62b2e59a57194727397a545901d617425c851922c26a4a4910f870de190f1932accfbf756f2a6540505b6f02"
});

var stateFrom = "Lead";
var stateTo = "Phone";
var recruiter = "Wayne";
var timeForStateChange = "2"; // number of days

// send single event to Keen IO
client.addEvents({
  "State changes" : [{"From": stateFrom}, {"To" : stateTo}, {"Recruiter" : recruiter}, {"Time taken:" : timeForStateChange}]
}, function(err, res) {
    if (err) {
        console.log("Oh no, an error!");
    } else {
        console.log("Hooray, it worked!");
    }
});
