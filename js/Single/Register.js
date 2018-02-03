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

  // Setting new date format from (yyyy-mm-dd) to (dd-mm-yyyy)
  var Old_Birth_Date = $('#Register-Birth_Date').val();
  var dateAr = Old_Birth_Date.split('-');
  var Birth_Date = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];

  //Find fields and set(JSON Format)
  var RegisterFormData = {
    Firstname: $('#Register-Firstname').val(),
    Middlename: $('#Register-Middlename').val(),
    Lastname: $('#Register-Lastname').val(),
    Email: $('#Register-Email').val(),
    Phone: $('#Register-Phone').val(),
    Birth_Date: Birth_Date,
    Vgs: $('#Register-Vgs').val(),
    Username: $('#Register-Username').val(),
    Password: $('#Register-Password').val(),
    CPassword: $('#Register-CPassword').val()
  };

  var $inputs = $(this).find("input, select, button, textarea");

  // Let's disable the inputs for the duration of the Ajax request.
  $inputs.prop("disabled", true);
  if (RegisterFormData.Password == RegisterFormData.CPassword) {


    // Fire off the request to php/Register.php
    request = $.ajax({
      url: "php/Single/Register_User.php",
      type: "post",
      data: RegisterFormData,
      success: function(data) {}
    });

    // Fired up on success
    request.done(function(data) {


      var Missing_Field = "Missing_Field_Data";
      var Username_Taken = "Username_Taken";
      var SQL_Done = "SQL_Done";
      var SQL_Error = "SQL_Error";

      if (data == Missing_Field) {
        console.log("Please fill out all fields");
      } else if (data == Username_Taken) {
        alert("Username is taken");
      } else if (data == SQL_Error) {
        alert("Error: SQL error");
      } else if (data == SQL_Done) {
        alert("New user added successfully");
        window.location.replace("http://localhost:8888/Login.html");
      } else {
        console.log(data);
      }


    })

    // Fired up on failure
    request.fail(function(xhr, textStatus, errorThrown) {
      alert("Error: " + errorThrown);
    })

    // Fired up no matter if the result is a success or failure
    request.always(function() {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    });
  } else {

    alert("Passwords does not match");
    $inputs.prop("disabled", false);

  }

});
