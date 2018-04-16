// ---------- START: Check if user is already logged in ---------- //

var request;

function StopAndRedirect(Type) {
  window.stop();
  window.location.href = "Home.php";
}

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

  if (data.Status == 'Error'){
    window.history.pushState(null, null, '?Error=' + data.Message);
    ShowLogin();
  } else if (data.Status == 'Failed') {
    window.history.pushState(null, null, '?Reason=' + data.Message);
    ShowLogin();
  } else if (data.Status == 'Done') {
    StopAndRedirect(data.Message);
  } else {
    window.history.pushState(null, null, '?ResponseError=' + data.Message);
    ShowLogin();
  }

  console.log(data);

})

// Fired up on failure
request.fail(function(xhr, textStatus, errorThrown) {
  window.history.pushState(null, null, '?ServerError=' + errorThrown);
  ShowLogin();
})

// ---------- START: Check if user is already logged in ---------- //
