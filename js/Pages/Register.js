// Define form data variable
var RegisterFormData = new FormData();

// On click open files
$('#Register-ImgTxt').click(function() {
  $('#Register-ImgSrc').trigger('click');
});
$('#Register-Img-UploadError').click(function() {
  $('#Register-ImgSrc').trigger('click');
  $('#Register-Img-UploadError').css('display', 'none');
  $('#Register-ImgTxt').css('display', 'flex');
});

// IMG preview after select
$("#Register-ImgSrc").on("change", function(e) {
  // Save image array, and send on form submit
  RegisterFormData.append('ImgSrc', this.files[0]);

  /*  //IMG INFO
    var file = this.files,
      fileName = file.name,
      fileSize = file.size;
    //console.log(e);
  */

  // ---------- START: Img preview ---------- //

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
    $("#Img-UploadData-One").empty();
    $("#Img-UploadData-Two").empty();

    // Append error message to div
    $('#Img-UploadData-Two').append('Allowed:<br>.jpeg - .jpg - .png');
    $('#Img-UploadData-One').append('Current: <span>.' + fileType.split('/')[1] + '</span>');

    // Display error: fileType not a match
    $('#Register-Img-UploadError').css('display', 'flex');

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
    $("#Img-UploadData-One").empty();
    $("#Img-UploadData-Two").empty();

    // Append error message to div
    $('#Img-UploadData-Two').append('Max: 10MB');
    $('#Img-UploadData-One').append('Current: ' + fileSizeFormatted);

    // Display error: fileType not a match
    $('#Register-Img-UploadError').css('display', 'flex');

    return false;

    // ---------- File size does not meet requirements ---------- //
  } else {

    var reader = new FileReader();
    reader.onload = imageIsLoaded;
    reader.readAsDataURL(this.files[0]);

  }

  // ---------- END: Img preview ---------- //

});

// Variable to hold request
var request;

// Bind to the submit event of our form
$("#Register-Main").submit(function(event) {

  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();

  // Abort any pending request
  if (request) {
    request.abort();
  }


  /* ---------- START: Declaring field values ---------- */

  // Setting new date format from (yyyy-mm-dd) to (dd-mm-yyyy)
  var Old_Birth_Date = $('#Register-Birth_Date').val();
  var dateAr = Old_Birth_Date.split('-');
  var Birth_Date = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];

  /*//Find fields and set(JSON Format)
  var RegisterFormData = {
    Firstname: $('#Register-Firstname').val(),
    Middlename: $('#Register-Middlename').val(),
    Lastname: $('#Register-Lastname').val(),
    Email: $('#Register-Email').val(),
    Phone: $('#Register-Phone').val(),
    Birth_Date: Birth_Date,
    Vgs: $('#Register-Vgs').val(),
    Username: $('#Register-Username').val(),
    Password: encodeURIComponent($('#Register-Password').val()),
    CPassword: encodeURIComponent($('#Register-CPassword').val()),
    'g-recaptcha-response': grecaptcha.getResponse()
  };*/

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
        maxlength: 40
      },
      Middlename: {
        required: false,
        minlength: 2,
        maxlength: 40
      },
      Lastname: {
        required: true,
        minlength: 2,
        maxlength: 40
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
        minlength: 6,
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
  if (RegisterFormData.Password == RegisterFormData.CPassword) {} else {
    alert("Your password and confirmation password do not match");
    validationFailed = true;
  }

  // Custom message on all fields
  /*  jQuery.extend(jQuery.validator.messages, {
      required: "This field is required.",
      remote: "Please fix this field.",
      email: "Please enter a valid email address.",
      url: "Please enter a valid URL.",
      date: "Please enter a valid date.",
      dateISO: "Please enter a valid date (ISO).",
      number: "Please enter a valid number.",
      digits: "Please enter only digits.",
      creditcard: "Please enter a valid credit card number.",
      equalTo: "Please enter the same value again.",
      accept: "Please enter a value with a valid extension.",
      maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
      minlength: jQuery.validator.format("Please enter at least {0} characters."),
      rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
      range: jQuery.validator.format("Please enter a value between {0} and {1}."),
      max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
      min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
  });*/

  // Custom for specific field
  /*  $("#myinput").rules("add", {
      required: true,
      minlength: 2,
      messages: {
        required: "Required input",
        minlength: jQuery.validator.format("Please, at least {0} characters are necessary")
      }
    });*/

  // Check if validation failed, and set new variable
  if ($ValidateForm.form()) {} else {
    validationFailed = true;
  }

  // If validation failed, stop form
  if (validationFailed) {
    event.preventDefault();
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

  // Fire off the request to php/Register.php
  request = $.ajax({
    url: "php/Single/Register_User.php",
    type: "post",
    data: RegisterFormData,
    contentType: false, // The content type used when sending data to the server.
    cache: false, // To unable request pages to be cached
    processData: false, // To send DOMDocument or non processed data file it is set to false
    success: function(data) {}
  });

  // Fired up on success
  request.done(function(data) {

    // Declaring responce variable
    var DB_Failed = "DB: Connection failed";
    var Missing_Field = "Missing_Field_Data";
    var Username_Taken = "Username_Taken";
    var SQL_Done = "SQL_Done";
    var SQL_Error = "SQL_Error";
    var Image_Non_Selected = "Image_Non_Selected";
    var Image_Validation_Failed = "Image_Validation_Failed";
    var Image_Error = "Image_Error";
    var reCAPTCHA_Failed = "reCAPTCHA: Failed";
    var reCAPTCHA_Not_Activated = "reCAPTCHA: Not activated";

    // Responce from Register.php
    if (data == DB_Failed) {
      alert("DB: Connection failed");
    } else if (data == Missing_Field) {
      alert("Please fill out all fields");
    } else if (data == Image_Non_Selected) {
      $("#Register-ImgTxt").css("color", "red");
      window.scrollTo(0, 0);
    } else if (data == Image_Validation_Failed) {
      alert("Image validation failed, try again");
      window.scrollTo(0, 0);
    } else if (data == Image_Error) {
      alert("Error uploading image, try again");
      window.scrollTo(0, 0);
    } else if (data == Username_Taken) {
      alert("Username is taken");
    } else if (data == SQL_Error) {
      alert("DB: Failed to create new user");
    } else if (data == reCAPTCHA_Failed) {
      alert("reCAPTCHA: Failed");
    } else if (data == reCAPTCHA_Not_Activated) {
      alert("Click to verify your human");
    } else if (data == SQL_Done) {
      alert("New user added successfully");
      console.log(data);
      window.location.href = "Login.html";
    } else {
      alert("Error: Responce not recognized");
    }


  })

  // Fired up on failure
  request.fail(function(xhr, textStatus, errorThrown) {
    alert("Error: " + errorThrown);
  })

  // Fired up no matter if the result is a success or failure
  request.always(function() {
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
$("#Register-Phone").on({
  keydown: function(e) {
    if (e.which === 32)
      return false;
  },
  change: function() {
    this.value = this.value.replace(/\s/g, "");
  }
});

// Disable special characters
$('#Register-Firstname, #Register-Middlename, #Register-Lastname').on('keypress', function(event) {
  var regex = new RegExp("^[a-zA-Z]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
});
