require("js/Functions/Notify.js");

function ShowLogin() {

  // Show html, opacity: 0; from Login_Auto.js
  $('body').css('display', 'block');

  // Define form data variable
  var LoginFormData = new FormData();

  // Variable to hold request
  var LoginRequest;

  // Bind to the submit event of our form
  $("#Login-Main").submit(function(event) {

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (LoginRequest) {
      LoginRequest.abort();
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
    LoginRequest = $.ajax({
      url: "php/Single/Login_User.php",
      type: "post",
      data: LoginFormData,
      dataType: "json",
      async: false,
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
    });

    // Fired up on success
    LoginRequest.done(function(data) {

      if (data.Status == 'Error') {

        // ---------- START: Error ---------- //

        // Title, TitleColor, Message, Icon, IconColor, Timeout
        Notify('ERROR', 'red', data.Message, 'fa fa-close', 'red', false);
        // Make button text back to 'Login' from spinner
        $('#Login-Submit').html('Login');

        // ---------- END: Error ---------- //

      } else if (data.Status == 'Failed') {

        // ---------- START: Login failed ---------- //

        //Start button shake and color change
        $('#Login-Submit').html('Login');
        $('#Login-Submit').css('animation', 'shake 300ms linear infinite');
        $('#Login-Submit').css('background', '#900000');

        // Go back to set color, and stop shake animation
        setTimeout(function() {
          $('#Login-Submit').css('animation', 'none');
          $('#Login-Submit').css('background', '#1779ba');
          $('#Login-Password').focus();
        }, 600);

        // Title, TitleColor, Message, Icon, IconColor, Timeout
        Notify('Login failed', 'yellow', data.Message, 'fa fa-warning', 'yellow', 3000);
        // Make button text back to 'Login' from spinner
        $('#Login-Submit').html('Login');


        // ---------- END: Login failed ---------- //

      } else if (data.Status == 'Done') {

        // ---------- START: Login done ---------- //

        // Change login button text and color
        $('#Login-Submit').css('transition', 'none');
        $('#Login-Submit').css('background', '#7fb836');

        window.location.href = 'Home.php';


        // ---------- END: Login done ---------- //

      } else {
        // ---------- START: Response not recognized ---------- //
        // Title, TitleColor, Message, Icon, IconColor, Timeout
        Notify('ERROR', 'red', 'Error: Response not recognized', 'fa fa-close', 'red', false);
        // console.log(data); // NOTE: For testing
        // ---------- END: Response not recognized ---------- //
        // Make button text back to 'Login' from spinner
        $('#Login-Submit').html('Login');
      }

    })

    // Fired up on failure
    LoginRequest.fail(function(xhr, textStatus, errorThrown) {
      // Display error for user
      Notify('ERROR', 'red', 'Connection failed: ' + errorThrown, 'fa fa-close', 'red', false);
      // Make button text back to 'Login' from spinner
      $('#Login-Submit').html('Login');
    })

    // Fired up no matter if the result is a success or failure
    LoginRequest.always(function() {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    })

    // ---------- END: Form submit to Login_User.php ---------- //

  });

}


// ---------- Change icon and input text color of username ---------- //

// Change icon color to white on focusIn
$('.Login-Username-Input').focusin(function() {
  $('.Content-Fields-Username span').css('color', 'white');
  $(this).css('color', 'white');
  $(this).addClass('Placeholder-Active');
});

// Change icon color to grey on focusOut
$(".Login-Username-Input").focusout(function() {
  $('.Content-Fields-Username span').css('color', '#9a9a9a');
  $(this).css('color', '#9a9a9a');
  $(this).removeClass('Placeholder-Active');
});


// ---------- Change icon and input text color of password ---------- //

// Change icon color to white on focusIn
$('.Login-Password-Input').focusin(function() {
  $('.Content-Fields-Password span').css('color', 'white');
  $('.Login-Password-Input').css('color', 'white');
  $(this).addClass('Placeholder-Active');
});

// Change icon color to grey on focusOut
$(".Login-Password-Input").focusout(function() {
  $('.Content-Fields-Password span').css('color', '#9a9a9a');
  $('.Login-Password-Input').css('color', '#9a9a9a');
  $(this).removeClass('Placeholder-Active');
});

// Captalize first letter of input (username is not case sensitive, but password is)
$('#Login-Username').on('keydown', function(event) {
  if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
    var $t = $(this);
    event.preventDefault();
    var char = String.fromCharCode(event.keyCode);
    $t.val(char + $t.val().slice(this.selectionEnd));
    this.setSelectionRange(1, 1);
  }
});
