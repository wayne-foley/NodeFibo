
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


function saveState() {
  var $btn = $("#btnSaveStage").button('saving');
  //Sam is lazy and just making three Ajax calls vs. refractoring handlers.  Sorry guys.
  $.post("/candidate/changeowner", {
      id : $("#candidate_value").val(),
      personId : $("#owner_change_value").val(),
      
    })
    .done(function(build) {
    });
  
  // $.post("/candidate/changedate", {
  //     id : $("#candidate_value").val(),
  //     dueDate : $("#owner_change_value").val(),
      
  //   })
  //   .done(function(build) {
  //     $('#changeStateModel').modal('hide');
  //     document.location = "/";
  //   });

  $.post("/candidate/changestate", {
      id : $("#candidate_value").val(),
      stateId : $("#stage_value").val(),
      
    })
    .done(function(build) {
      $('#changeStateModel').modal('hide');
      document.location = "/";
    });
}
