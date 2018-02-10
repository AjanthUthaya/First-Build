// ---------- START: Logout user ---------- //

// Delcaring logout buttons id
var IdName = "Logout-Main";

// Checking if id exists on this page
if ($("#" + IdName).length !== 0) {

  // On logout button click
  $("#" + IdName).on("click", function() {

    // Declare ajax requests name
    var request;

    // Function to stop what ever the page is doing and redirect the user to login page
    function StopAndRedirect() {
      window.stop();
      window.location.href = "Login.html";
    }

    // Fire off the request to php/Single/Logout.php
    request = $.ajax({
      url: "php/Partials/Logout.php",
      type: "post",
      async: false,
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
    });

    // Fired up on ajax success
    request.done(function(data) {

      if (data == "Logged out") {
        StopAndRedirect();
      } else {
        alert("Error: Could not logout");
      }

    })

    // Fired up on ajax failure
    request.fail(function(xhr, textStatus, errorThrown) {
      alert("Error: " + errorThrown);
    })

  });

}

// ---------- START: Logout user ---------- //
