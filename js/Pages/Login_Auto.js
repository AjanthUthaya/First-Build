// ---------- START: Check if user is already logged in ---------- //

var request;

// Function to stop everthing, and redirect to x
function StopAndRedirect(Href) {
  window.stop();
  window.location.href = Href;
}

// Function to get values of URL parameter
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
}


// Get url parameter with name of Reason
var URL_Param = Array(
  getUrlVars().Reason,
  getUrlVars().Error,
  getUrlVars().ResponseError,
  getUrlVars().ServerError
);

// console.log(URL_Param); // TESTING


// Check if Reason is defined
if (URL_Param[0] !== undefined ||
  URL_Param[1] !== undefined ||
  URL_Param[2] !== undefined ||
  URL_Param[3] !== undefined) {

  ShowLogin();

} else {

  // Fire off the request to php/Single/Login_Auto.php
  request = $.ajax({
    url: "php/Single/Login_Auto.php",
    type: "get",
    dataType: "json",
    contentType: false, // The content type used when sending data to the server.
    cache: false, // To unable request pages to be cached
    processData: false, // To send DOMDocument or non processed data file it is set to false
  });

  // Fired up on success
  request.done(function(data) {

    if (data.Status == 'Error') {
      window.history.pushState(null, null, '?Error=' + data.Message);
      ShowLogin();
    } else if (data.Status == 'Failed') {
      window.history.pushState(null, null, '?Reason=' + data.Message);
      ShowLogin();
    } else if (data.Status == 'Done') {
      StopAndRedirect('Home.php');
    } else {
      window.history.pushState(null, null, '?ResponseError=' + data.Message);
      ShowLogin();
    }

  })

  // Fired up on failure
  request.fail(function(xhr, textStatus, errorThrown) {
    window.history.pushState(null, null, '?ServerError=' + errorThrown);
    ShowLogin();
  })

};

// ---------- START: Check if user is already logged in ---------- //
