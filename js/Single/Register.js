// Variable to hold request
var request;

// Bind to the submit event of our form
$("#Register-Main").submit(function(event) {
  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();

  // Abort any pending request
  if (request) {
    request.abort();
  }

  //Find fields and set(JSON Format)
  var RegisterFormData = {
    Firstname: $("#Register-Firstname").val(),
    Middlename: $("#Register-Middlename").val(),
    Lastname: $("#Register-Lastname").val(),
    Email: $("#Register-Email").val(),
    Phone: $("#Register-Phone").val(),
    Birth_Date: $("#Register-Birth_Date").val(),
    Vgs: $("#Register-Vgs").val(),
    Username: $("#Register-Username").val(),
    Password: $("#Register-Password").val(),
    CPassword: $("#Register-CPassword").val()
  };

  var $inputs = $(this).find("input, select, button, textarea");

  // Let's disable the inputs for the duration of the Ajax request.
  $inputs.prop("disabled", true);


  // Fire off the request to php/Register.php
  request = $.ajax({
    url: "php/Single/Register_User.php",
    type: "post",
    data: RegisterFormData,
    success: function(data) {
      console.log(data);
    }
  });

// Fired up no matter if the result is a success or failure
  request.always(function() {
    // Reenable the inputs
    $inputs.prop("disabled", false);
  });

});
