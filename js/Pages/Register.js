// Define form data variable
var RegisterFormData = new FormData();

// On click open files
$('#Register-ImgTxt').click(function() {
  $('#Register-ImgSrc').trigger('click');
});

$('#Register-Img-Error').click(function() {
  $('#Register-ImgSrc').trigger('click');
  $('#Register-Img-Error').css('display', 'none');
  $('#Register-ImgTxt').css('display', 'flex');
});

require("js/Functions/Notify.js");

// ---------- START: Img preview ---------- //

$("#Register-ImgSrc").on("change", function(e) {
  // Save image array, and send on form submit
  RegisterFormData.append('ImgSrc', this.files[0]);

  /*  //IMG INFO
    var file = this.files,
      fileName = file.name,
      fileSize = file.size;
    //console.log(e);
  */

  function imageIsLoaded(e) {
    $('#Register-Img').attr('src', e.target.result);
    $('#Register-ImgTxt').css('opacity', '0');
  }

  var file = this.files[0];
  var fileType = file.type;
  var fileSize = file.size;
  var match = ["image/jpeg", "image/png", "image/jpg"];
  if (!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]))) {

    // ---------- File type does not match any from array ---------- //
    // Fallback image
    $('#Register-Img').attr('src', 'img/Profile_Placeholder.png');

    // Select image, display none
    $('#Register-ImgTxt').css('display', 'none');

    // To remove the previous error message
    $("#Img-Error-Current").empty();
    $("#Img-Error-Max").empty();

    // Append error message to div
    $('#Img-Error-Max').append('Allowed:<br>.jpeg - .jpg - .png');
    $('#Img-Error-Current').append('Incompatiable format');
    //$('#Img-Error-Current').append('Current: <span>.' + fileType.split('/')[1] + '</span>');

    // Display error: fileType not a match
    $('#Register-Img-Error').css('display', 'flex');

    // Wrong format
    Notify('Incompatiable format', 'yellow', 'Accepted formats: .jpeg - .jpg - .png', 'fa fa-warning', 'yellow', 5000);

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
    $('#Register-Img').attr('src', 'img/Profile_Placeholder.png');

    // Select image, display none
    $('#Register-ImgTxt').css('display', 'none');

    // To remove the previous error message
    $("#Img-Error-Current").empty();
    $("#Img-Error-Max").empty();

    // Append error message to div
    $('#Img-Error-Max').append('Max: 10MB');
    $('#Img-Error-Current').append('Image file is too big');
    //$('#Img-Error-Current').append('Current: ' + fileSizeFormatted);

    // Display error: fileType not a match
    $('#Register-Img-Error').css('display', 'flex');

    // File size is too big
    Notify('Image size', 'yellow', 'Image size is too big, max 10MB', 'fa fa-warning', 'yellow', 5000);

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
var RegisterRequest;

// Bind to the submit event of our form
$("#Register-Main").submit(function(event) {

  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();

  // Abort any pending request
  if (RegisterRequest) {
    RegisterRequest.abort();
  }


  /* ---------- START: Declaring field values ---------- */

  // Setting new date format from (yyyy-mm-dd) to (dd-mm-yyyy)
  var Old_Birth_Date = $('#Register-Birth_Date').val();
  var dateAr = Old_Birth_Date.split('-');
  var Birth_Date = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];

  RegisterFormData.append('Firstname', $('#Register-Firstname').val());
  RegisterFormData.append('Middlename', $('#Register-Middlename').val());
  RegisterFormData.append('Lastname', $('#Register-Lastname').val());
  RegisterFormData.append('Email', $('#Register-Email').val());
  RegisterFormData.append('Phone', $('#Register-Phone').val());
  RegisterFormData.append('Birth_Date', Birth_Date);
  RegisterFormData.append('Vgs', $('#Register-Vgs').val());
  RegisterFormData.append('Username', $('#Register-Username').val());
  RegisterFormData.append('Password', $('#Register-Password').val());
  RegisterFormData.append('CPassword', $('#Register-CPassword').val());
  RegisterFormData.append('g-recaptcha-response', grecaptcha.getResponse());

  /* ---------- END: Declaring field values ---------- */


  // ---------- START: Validation ---------- //

  // Declare Validation variable
  var validationFailed = false;

  // Validation of #Register-Main form
  var $ValidateForm = $('#Register-Main').validate({ // initialize the plugin
    rules: {
      Firstname: {
        required: true,
        minlength: 2,
        maxlength: 25
      },
      Middlename: {
        required: false,
        minlength: 2,
        maxlength: 25
      },
      Lastname: {
        required: true,
        minlength: 2,
        maxlength: 25
      },
      Email: {
        required: true,
        minlength: 5,
        maxlength: 50,
        email: true
      },
      Phone: {
        required: true,
        minlength: 8,
        maxlength: 8,
        number: true
      },
      Birth_Date: {
        required: true,
        minlength: 10,
        maxlength: 10
      },
      Vgs: {
        required: true
      },
      Username: {
        required: true,
        minlength: 5,
        maxlength: 50
      },
      Password: {
        required: true,
        minlength: 6,
        maxlength: 50
      },
      CPassword: {
        required: true,
        minlength: 6,
        maxlength: 50
      }
    }
  });

  // Check to see if Password and CPassword match
  if ($('#Register-Password').val() == $('#Register-CPassword').val()) {
    // BUG: Keep this space or the script dosent work for some reason
  } else {
    // Password confirmation failed
    Notify('Password confirmation', 'yellow', 'Your password and confirmation password do not match', 'fa fa-warning', 'yellow', 5000);

    // Prevents form from submiting data
    validationFailed = true;
  }

  // Check if validation failed, and set new variable
  if ($ValidateForm.form()) {
    // Just in case this has the same BUG as the one above
  } else {
    // Form validation failed
    Notify('Form validation failed', 'red', '', 'fa fa-close', 'red', '');

    // Prevents form from submiting data
    validationFailed = true;
  }

  // If validation failed, stop form
  if (validationFailed == true) {
    return false;
  }

  // Else, if "validationFailed = false" keep running the script

  // ---------- END: Validation ---------- //



  // ---------- START: Disabling input during form submit ---------- //

  var $inputs = $(this).find("input, select, button, textarea");

  // Let's disable the inputs for the duration of the Ajax request.
  $inputs.prop("disabled", true);

  // ---------- END: Disabling input during form submit ---------- //



  // ---------- START: Form submit to Register.php ---------- //

  // Fire off the request to php/Single/Register.php
  RegisterRequest = $.ajax({
    url: "php/Single/Register_User.php",
    type: "post",
    data: RegisterFormData,
    contentType: false, // The content type used when sending data to the server.
    cache: false, // To unable request pages to be cached
    processData: false, // To send DOMDocument or non processed data file it is set to false
    success: function(data) {}
  });

  // Fired up on success
  RegisterRequest.done(function(data) {

    console.log(data);

  })

  // Fired up on failure
  RegisterRequest.fail(function(xhr, textStatus, errorThrown) {
    // Display error for user
    Notify('ERROR', 'red', 'Connection failed: ' + errorThrown, 'fa fa-close', 'red', false);
  })

  // Fired up no matter if the result is a success or failure
  RegisterRequest.always(function() {
    // Reenable the inputs
    $inputs.prop("disabled", false);
    // Reset reCAPTCHA after form submit
    grecaptcha.reset();
  });

  // ---------- END: Form submit to Register.php ---------- //

});


// Add space on every 3 number
/*$('#Register-Phone').on('keypress change', function() {
  $(this).val(function(index, value) {
    return value.replace(/\W/gi, '').replace(/(.{3})/g, '$1 ');
  });
});*/

// Disable space
$("#Register-Phone, #Register-Email").on({
  keydown: function(e) {
    if (e.which === 32)
      return false;
  },
  change: function() {
    this.value = this.value.replace(/\s/g, "");
  }
});

// Disable special characters
$('#Register-Firstname, #Register-Middlename, #Register-Lastname, #Register-Username').on('keypress', function(event) {
  var regex = new RegExp("^[a-zA-Z]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
});

// Disable paste
$(document).ready(function() {
  $('#Register-Firstname, #Register-Middlename, #Register-Lastname, #Register-Username').bind("paste", function(e) {
    e.preventDefault();
  });
});

// Captalize first letter of input
$('#Register-Firstname, #Register-Middlename, #Register-Lastname, #Register-Username').on('keydown', function(event) {
  if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
    var $t = $(this);
    event.preventDefault();
    var char = String.fromCharCode(event.keyCode);
    $t.val(char + $t.val().slice(this.selectionEnd));
    this.setSelectionRange(1, 1);
  }
});
