// ---------- START: Check if user is already logged in ---------- //

var request;

function StopAndRedirect() {
  window.stop();
  window.location.href = "Home.html";
}

// Fire off the request to php/Single/Login_Auto.php
request = $.ajax({
  url: "php/Single/Login_Auto.php",
  type: "post",
  contentType: false, // The content type used when sending data to the server.
  cache: false, // To unable request pages to be cached
  processData: false, // To send DOMDocument or non processed data file it is set to false
});

// Fired up on success
request.done(function(data) {

  if (data == "Auto_Login_True") {
    StopAndRedirect();
  } else if (data == "Session_Expired_Date") {
    ShowLogin();
  } else if (data == "Session_Empty_Data") {
    ShowLogin();
  } else if (data == "Session_Username_NoMatch") {
    ShowLogin();
  } else if (data == "DB_GetData_Error") {
    ShowLogin();
  } else if (data == "DB_Empty_Data") {
    ShowLogin();
  } else if (data == "Session_DB_NotEqual") {
    ShowLogin();
  } else {
    alert("Error: Response not recognized");
  }

})

// Fired up on failure
request.fail(function(xhr, textStatus, errorThrown) {
  alert("Error: " + errorThrown);
  ShowLogin();
})

// ---------- START: Check if user is already logged in ---------- //
