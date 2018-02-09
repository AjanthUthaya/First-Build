// ---------- START: Image on click open files ---------- //

// Define form data variable
var ProfileFormData = new FormData();

// Delcaring logout buttons id
var IdName = "Profile-Img-Edit";

// Checking if id exists on this page
if ($("#" + IdName).length !== 0) {

  $('#Profile-Img-Edit, #Content-Image-Text').click(function() {
    $('#Profile-Img-Src').trigger('click');
  });

  // ---------- END: Image on click open files ---------- //



  // ---------- START: Img preview ---------- //

  $("#Profile-Img-Src").on("change", function(e) {

    // Save image array, and send on form submit
    ProfileFormData.append('ImgSrc', this.files[0]);

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


      return false;

      // ---------- File size does not meet requirements ---------- //
    } else {

      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(this.files[0]);

    }

  });



  // ---------- END: Img preview ---------- //



  // Variable to hold request
  var request;

  // Bind to the submit event of our form
  $("#Save-Profile-Content-Active").submit(function(event) {

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
      request.abort();
    }

    // ---------- START: Declaring field values ---------- //

    RegisterFormData.append('Firstname', $('#Register-Firstname').val());

    // ---------- END: Declaring field values ---------- //



    /*
      // If validation failed, stop form
      if (validationFailed) {
        event.preventDefault();
        return false;
      }
    */



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
      data: RegisterFormData,
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
