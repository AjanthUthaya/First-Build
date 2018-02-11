// ---------- START: Three seprate validations (IMG - EMAIL - PHONE) ---------- //

// ---------- START: IMG validation and preview ---------- //


var ImgVal = true;

// On click open files
$('#Content-Image-Text, #Profile-Img-Edit').click(function() {
  $('#Profile-Img-Src').trigger('click');
});

// ---------- START: Img preview ---------- //

$("#Profile-Img-Src").on("change", function(e) {

  // Save image array, and send on form submit
  //RegisterFormData.append('ImgSrc', this.files[0]); // NOTE: Try to find another metode

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

    ImgVal = false;

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

    ImgVal = false;

    return false;

    // ---------- File size does not meet requirements ---------- //
  } else {

    // ---------- File type and size match requirements ---------- //
    var reader = new FileReader();
    reader.onload = imageIsLoaded;
    reader.readAsDataURL(this.files[0]);
    ImgVal = true;

  }

});


// ---------- END: Img preview ---------- //


// ---------- END: IMG validation and preview ---------- //



// ---------- START: EMAIL validation ---------- //


var EmailVal = true;

// Store old values
var Old_Email_Val = $('#User-Email-Profile').val();

$('#User-Email-Profile').on('input', function() {
  //Check if input is empty
  if ($(this).val().length === 0) {
    // Input is empty

    var EmailVal = false;
  } else {
    // Input has length

    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }
    //Check if email is valid
    EmailVal = isEmail($('#User-Email-Profile').val());
  }
});


// ---------- END: EMAIL validation ---------- //



// ---------- START: PHONE validation ---------- //


var PhoneVal = true;

// Store old values
var Old_Phone_Val = $('#User-Phone-Profile').val();

$('#User-Phone-Profile').on('input', function() {
  //Check if input is empty
  if ($(this).val().length === 0) {
    // Input is empty

    var PhoneVal = false;
  } else {
    // Input has length

    function isPhone(phone) {
      var regex = /^[0-9]{8}$/;
      return regex.test(phone);
    }
    //Check if email is valid
    PhoneVal = isPhone($('#User-Phone-Profile').val());
  }
});


// ---------- END: PHONE validation ---------- //

// ---------- END: Three seprate validations (IMG - EMAIL - PHONE) ---------- //



// ---------- START: Check validation, if true activate save button ---------- //

// Prevents the script from running onLoad
$(document).ready(function() {

  // Change save button to active if all three validations are true
  $('#User-Email-Profile, #User-Phone-Profile, #Profile-Img-Edit').on('input load', function() {
    // Store new values
    var New_Email_Val = $('#User-Email-Profile').val();
    var New_Phone_Val = $('#User-Phone-Profile').val();

    // Check if the new phone or email is the same, and that validation is true
    if (ImgVal == true && EmailVal == true && PhoneVal == true) {
      // Validation successful, activate save button
      $("#Save-Profile-Content").addClass("Save-Profile-Active");
      $("#Save-Profile-Content").css("opacity", "1");
    } else {
      // Validation failed, disable save button
      $("#Save-Profile-Content").removeClass("Save-Profile-Active");
      $("#Save-Profile-Content").css("opacity", "0.6");
    }
  });

  // On save click check validation, then get and send data
  $('body').on('click', '.Save-Profile-Active', function(event) {

    if (ImgVal == true && EmailVal == true && PhoneVal == true) {
      // Validation successful, send data
      console.log("Sending...");
    }
  });

});


// ---------- END: Check validation, if true activate save button ---------- //
