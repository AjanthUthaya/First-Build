var ImgVal = false;
var EmailVal = false;
var PhoneVal = false;

// ---------- START: Tigger folders opening OnClick ---------- //

// Define form data variable
var ProfileFormData = new FormData();

// Delcaring logout buttons id
var IdName = "Profile-Img-Edit";

// Checking if id exists on this page
if ($("#" + IdName).length !== 0) {

  $('#Profile-Img-Edit, #Content-Image-Text').click(function() {
    $('#Profile-Img-Src').trigger('click');
  });

  // ---------- END: Tigger folders opening OnClick ---------- //



  // ---------- START: Img preview ---------- //

  $("#Profile-Img-Src").on("change", function(e) {

    //IMG INFO (Testing)
    //var file = this.files[0],
    //fileName = file.name,
    //fileSize = file.size;
    //console.log(fileName);

    function imageIsLoaded(e) {
      $('#Profile-Img-Edit').attr('src', e.target.result);
      $('#Content-Image-Text').css('opacity', '0');
    }

    var file = this.files[0];
    var fileType = file.type;
    var fileSize = file.size;
    var match = ["image/jpeg", "image/png", "image/jpg"];
    if (!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]))) {

      // ---------- File type does not match any from array ---------- //
      // Fallback image
      $('#Profile-Img-Edit').attr('src', 'img/Profile_Placeholder.png');

      // Select image, display none
      $('#Content-Image-Text').css('display', 'none');

      return false;

    } else if (fileSize > 10485760) {
      
      // ---------- File size does not meet requirements ---------- //
      function formatBytes(bytes, decimalPoint) {
        if (bytes == 0) return '0 Bytes';
        var k = 1000,
          dm = decimalPoint || 2,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
      }

      var fileSizeFormatted = formatBytes(fileSize, 2);

      // Fallback image
      $('#Profile-Img-Edit').attr('src', 'img/Profile_Placeholder.png');

      // Select image, display none
      $('#Content-Image-Text').css('display', 'none');

      // Display error message


      return false;

      // ---------- File size does not meet requirements ---------- //
    } else {

      // Save image array, and send on form submit
      ProfileFormData.append('ImgSrc', this.files[0]);

      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(this.files[0]);

      ImgVal = true;

    }

  });



  // ---------- END: Img preview ---------- //



  // ---------- START: Activate save button on change from default values ---------- //

  // Get old values
  var Old_Email_Value = $('#User-Email-Profile').val();
  var Old_Phone_Value = $('#User-Phone-Profile').val();
  var Old_ImgSrc_Value = $('.Content-Image-Main').find('img').attr('src');

  function ProfileChange() {

    // If new values, change button to active
    $('#User-Email-Profile, #User-Phone-Profile, #Profile-Img-Edit').on('input load', function() {

      function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      }

      function isPhone(phone) {
        var regex = /^[0-9]{8}$/;
        return regex.test(phone);
      }

      var New_Email_Value = $('#User-Email-Profile').val();
      var New_Phone_Value = $('#User-Phone-Profile').val();
      var New_ImgSrc_Value = $('.Content-Image-Main').find('img').attr('src');

      console.log(Old_Email_Value + '  ' + New_Email_Value + Old_Phone_Value + '  ' + New_Phone_Value);
      console.log(Old_ImgSrc_Value);
      if (Old_Email_Value !== New_Email_Value || Old_Phone_Value !== New_Phone_Value || Old_ImgSrc_Value !== New_ImgSrc_Value) {

        // Button is active
        $('#Save-Profile-Content').css('opacity', '1');
        $('#Save-Profile-Content').css('cursor', 'pointer');
        $('#Save-Profile-Content').addClass('Save-Profile-Content-Active');

      } else {
        // Button is inactive
        $('#Save-Profile-Content').css('opacity', '0.6');
        $('#Save-Profile-Content').css('cursor', 'default');
      }

      EmailVal = isEmail(New_Email_Value);
      PhoneVal = isPhone(New_Phone_Value);
      console.log(PhoneVal);
    });

  }

  $(document).ready(function() {
    ProfileChange();
  });

  // ---------- END: Activate save button on change from default values ---------- //









  // Variable to hold request
  var request;

  // On save send new data to DB and update SESSION
  $('body').on('click', '.Save-Profile-Content-Active', function(event) {
    if (ImgVal == true || EmailVal == true || PhoneVal == true) {

    }
    // Save email and phone to array, and send on form submit
    ProfileFormData.append('Email', $('#User-Email-Profile').val());
    ProfileFormData.append('Phone', $('#User-Phone-Profile').val());

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
      request.abort();
    }


    // ---------- START: Disabling input during form submit ---------- //

    var $inputs = $(this).find("input, select, button, textarea");

    // Let's disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    // ---------- END: Disabling input during form submit ---------- //



    // ---------- START: Send new data to profile_update.php ---------- //

    // Fire off the request to php/Partials/Profile_Update.php
    request = $.ajax({
      url: "php/Partials/Profile_Update.php",
      type: "post",
      data: ProfileFormData,
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
      success: function(data) {}
    });

    // Fired up on success
    request.done(function(data) {
      console.log(data);
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

  });

  // ---------- END: Send new data to profile_update.php ---------- //

}
