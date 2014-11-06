
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
  $.post("/candidate/changestate", {
      id : $("#candidate_value").val(),
      stateId : $("#stage_value").val(),
      
    })
    .done(function(build) {
      $('#changeStateModel').modal('hide');
      document.location = "/";
    });
}
