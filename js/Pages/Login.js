function ShowLogin() {

  // Show html, opacity: 0; from Login_Auto.js
  $('body').css('display', 'block');

  // Define form data variable
  var LoginFormData = new FormData();

  // Variable to hold request
  var request;

  // Bind to the submit event of our form
  $("#Login-Main").submit(function(event) {

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
      request.abort();
    }


    /* ---------- START: Declaring field values ---------- */

    /*//Find fields and set(JSON Format)
    var LoginFormData = {
      Username: $('#Login-Username').val(),
      Password: encodeURIComponent($('#Login-Password').val())
    };*/

    LoginFormData.append('Username', $('#Login-Username').val());
    LoginFormData.append('Password', $('#Login-Password').val());

    /* ---------- END: Declaring field values ---------- */



    // ---------- START: Disabling input during form submit ---------- //

    var $inputs = $(this).find("input, select, button, textarea");

    // Let's disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    // ---------- END: Disabling input during form submit ---------- //

    $('#Login-Submit').html('<i class="Spinner"></i>');

    // ---------- START: Form submit to Login_User.php ---------- //

    // Fire off the request to php/Single/Login_User.php
    request = $.ajax({
      url: "php/Single/Login_User.php",
      type: "post",
      data: LoginFormData,
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
      success: function(data) {}
    });

    // Fired up on success
    request.done(function(data) {

      //Declaring response variables
      var DB_Failed = "DB: Connection failed";
      var Missing_Field_Data = "Missing_Field_Data";
      var Login_Failed = "Login_Failed";
      var Password_Get_Error = "Password_Get_Error";
      var DB_GetData_Error = "DB_GetData_Error";
      var Login_Success = "Login_Success";

      if (data == DB_Failed) {
        alert("DB: Connection failed");
      } else if (data == Missing_Field_Data) {
        alert("Please fill out both values");
      } else if (data == Login_Failed) {
        $('#Login-Submit').html('Login');
        $('#Login-Submit').css('animation', 'shake 200ms linear infinite');
        $('#Login-Submit').css('color', 'red');
        setTimeout(function() {
          $('#Login-Submit').css('animation', 'none');
          $('#Login-Submit').css('color', 'white');
        }, 600)

      } else if (data == Password_Get_Error) {
        alert("DB: Could not get password");
      } else if (data == DB_GetData_Error) {
        alert("DB: Could not get data");
      } else if (data == Login_Success) {
        window.location.href = "Home.html";
        $('#Login-Submit').html('Logging in...');
      } else {
        alert("Error: Response not recognized");
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

    // ---------- END: Form submit to Login_User.php ---------- //

  });

}
