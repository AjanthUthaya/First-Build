// ---------- START: User validation ---------- //

function ValidateUser() {

  // Variable to hold request
  var Validation;

  // Abort any pending request
  if (Validation) {
    Validation.abort();
  }

  // ---------- START: Form submit to Login_Validation.php ---------- //

  // Fire off the request to php/Partials/Login_Validation.php
  Validation = $.ajax({
    url: "php/Partials/Login_Validation.php",
    type: "post",
    contentType: false, // The content type used when sending data to the server.
    cache: false, // To unable request pages to be cached
    processData: false, // To send DOMDocument or non processed data file it is set to false
  });

  // Fired up on success
  Validation.done(function(data) {
    // Do nothing
    var Data = data.split('-');
    if (Data[0] == "Redirect") {

      $('body').css('display', 'none');
      window.location.href = "Login.html?Reason=" + Data[1];

    }

  })

  // Fired up on failure
  Validation.fail(function(xhr, textStatus, errorThrown) {
    // Do nothing
  })

  // ---------- END: Form submit to Login_Validation.php ---------- //

}

// ---------- START: User validation ---------- //

// Run validation once
function FirstLoad() {
  ValidateUser();
  $('body').css('display', 'block');
} // NOTE: You need to add body{ display: none; } to css

FirstLoad();

// Run every x secounds
window.setInterval(function() {
  ValidateUser();
}, 120); //1000 = 1 sec
