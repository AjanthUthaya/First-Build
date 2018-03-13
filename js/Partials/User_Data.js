// ---------- START: Get user data and place it ---------- //

// Delcaring ID
var IdName = "User-Name-Main";

// Checking if id exists on this page
if ($("#" + IdName).length !== 0) {

  // Declaring where to store User_Data in JSON format
  var UserData;

  // Declare ajax requests name
  var request;

  // Fire off the request to php/Single/User_Data.php
  request = $.ajax({
    url: "php/Partials/User_Data.php",
    type: "post",
    dataType: "json",
    async: false,
    contentType: false, // The content type used when sending data to the server.
    cache: false, // To unable request pages to be cached
    processData: false, // To send DOMDocument or non processed data file it is set to false
  });

  // Fired up on ajax success
  request.done(function(json) {
    UserData = json;
  })

  // Fired up on ajax failure
  request.fail(function(xhr, textStatus, errorThrown) {
    console.log("Error: " + errorThrown);
    /*    $('body').css('display', 'none');
        alert("Failed to get user data, logging out");
        window.stop();
        window.location.href = "Login.html";*/
  })

  if (typeof UserData == 'object') {

    // ---------- START: Declaring user variables ---------- //

    var User_Firstname = UserData.Firstname;
    var User_Middlename = UserData.Middlename;
    var User_Lastname = UserData.Lastname;
    var User_Email = UserData.Email;
    var User_Phone = UserData.Phone;
    var User_ImgSrc = UserData.Img_Src;

    // ---------- END: Declaring user variables ---------- //



    // ---------- START: Setting user data into place ---------- //

    // If user has no middlename
    if (User_Middlename == 'NULL') {
      $('#User-Name-Main').html(User_Firstname + " " + User_Lastname);
      $('#User-Name-Dropdown').html(User_Firstname + " " + User_Lastname);
      $('#User-Name-Profile').html(User_Firstname + " " + User_Lastname);
    } else {
      $('#User-Name-Main').html(User_Firstname + " " + User_Middlename + " " + User_Lastname);
      $('#User-Name-Dropdown').html(User_Firstname + " " + User_Middlename + " " + User_Lastname);
      $('#User-Name-Profile').html(User_Firstname + " " + User_Middlename + " " + User_Lastname);
    }

    $('#Profile-Img-Main').attr('src', User_ImgSrc);
    $('#Profile-Img-Edit').attr('src', User_ImgSrc);

    $('#User-Email-Profile').val(User_Email);
    $('#User-Phone-Profile').val(User_Phone);

    // ---------- START: Setting user data into place ---------- //
  }

  // Set it back to null after use
  UserData = null;

}

// ---------- START: Get user data and place it ---------- //
