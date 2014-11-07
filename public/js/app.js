
function onPositionChanged() {
  if($("#position").val() ==="new"){
    addNewPosition();
  }
}

function addNewPosition () {
  // alert('i need to add a new position');
  $("#addNewPositionModal").modal();
}

function saveNewPosition() {
  var $btn = $("#btnSavePosition").button('saving');
  $.post("/positions/add", {
      name : $("#inputPositionName").val(),
      reqLink : $("#inputRequisitionLink").val(),
      description : $("#inputPositionDescription").val()
    })
    .done(function(build) {
      $('#addNewPositionModal').modal('hide');
    });
}

function getFunnelStats(rec, own){
   $.post("/funnelStats", {
    Recruiter_PersonId : rec,
    Owner_PersonId : own,
   })
    .done(function(results) {
      var chart_html = "";
      var stages = ["Lead", "Phone Screen", "Interview", "Offer", "Accepted"];
      var stage_icons = ["lead", "phone", "interview", "offer", "accepted"];
      //TODO: Dynamically pull stage names from backend.  Hardcoding for now
      for(i=0; i<stages.length; i++){
        chart_html += "<td style='width:20%;' data-toggle='tooltip' data-placement='auto' title='"+stages[i]+"'><i class='fa tp-"+stage_icons[i]+"' style='font-size:20px;'></i><div style='font-size:12px;'>"+results.overallFunnelStats.funnel[i];
        if(i != stages.length-1) {
          chart_html += "<td style='font-size:20px;'><div class='arrow_box' style='width:28px;height:14px;position:relative;top:-2px' data-toggle='tooltip' data-placement='auto' title='Percent that move on'><span style='font-size:11px;position:absolute;left:3px;top:0px;'>" + Math.round(results.overallFunnelStats.aggragate[i+1]) + "%";
          chart_html +="</span></div></td>";
        }
      }
      $("#funnel_target_all").removeClass("loading");
      $("#funnel_row_all").html(chart_html);

      //Now for 7 day
      chart_html = "";
      for(i=0; i<stages.length; i++){
        chart_html += "<td style='width:20%;' data-toggle='tooltip' data-placement='auto' title='"+stages[i]+"'><i class='fa tp-"+stage_icons[i]+"' style='font-size:20px;'></i><div style='font-size:12px;'>"+results.weeklyFunnelStats.funnel[i];
        if(i != stages.length-1) {
          chart_html += "<td style='font-size:20px;'><div class='arrow_box' style='width:28px;height:14px;position:relative;top:-2px' data-toggle='tooltip' data-placement='auto' title='Percent that move on'><span style='font-size:11px;position:absolute;left:3px;top:0px;'>" + Math.round(results.weeklyFunnelStats.aggragate[i+1]) + "%";
          chart_html +="</span></div></td>";
        }
      }
      $("#funnel_target_seven").removeClass("loading");
      $("#funnel_row_seven").html(chart_html);
    });
}


function saveState() {
  var $btn = $("#btnSaveStage").button('saving');
  //Sam is lazy and just making three Ajax calls vs. refractoring handlers.  Sorry guys.
  $.post("/candidate/changeowner", {
      id : $("#candidate_value").val(),
      personId : $("#owner_change_value").val(),
      
    })
    .done(function(build) {
    });
  
  var date = moment($(".datetimepicker").data('date'));

  $.post("/candidate/changeDueDate", {
      id : $("#candidate_value").val(),
      dueDate : date.format('YYYY-MM-DD')
      
    })
    .done(function(build) {
    });

  $.post("/candidate/changestate", {
      id : $("#candidate_value").val(),
      stateId : $("#stage_value").val(),
      
    })
    .done(function(build) {
      $('#changeStateModel').modal('hide');
      document.location = "/";
    });
}
