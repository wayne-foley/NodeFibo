
function onPositionChanged() {
  if($("#position").val() ==="new"){
    addNewPosition();
  }
}

function addNewPosition () {
  // alert('i need to add a new position');
  $("#addNewPositionModal").modal();
}

function saveNewPosition(){
  $.post("/positions/add", {
      name : $("#inputPositionName").val(),
      reqLink : $("#reqLink").val()
    })
    .done(function(build) {
      $btn.button('started');
    });

    alert('');
}
