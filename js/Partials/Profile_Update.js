// Include functions to display notifications
require("js/Functions/Notify.js");

// ---------- START: Check validation, if true activate save button ---------- //

// Declaring where to store form data
var ProfileUpdateData = new FormData();

// Store old values
var Old_Email_Val = $('#User-Email-Profile').val();
var Old_Phone_Val = $('#User-Phone-Profile').val();
var Old_Img_Val = $('#Profile-Img-Edit').attr('src');

// Declare new values
var New_Email_Val;
var New_Phone_Val;

// Prevents the script from running onLoad
$(document).ready(function() {

   var ImgVal = true;
   var EmailVal = true;
   var PhoneVal = true;

   // Simple function to disable and enable save button
   function SaveButton(Value) {
      if (Value == 'Disable') {
         // Disable button
         $('#Save-Profile-Content').css('opacity', '0.6');
         $('#Save-Profile-Content').css('cursor', 'default');
         $('#Save-Profile-Content').removeClass('Save-Profile-Active');
      } else if (Value == 'Activate') {
         // Activate button
         $('#Save-Profile-Content').css('opacity', '1');
         $('#Save-Profile-Content').css('cursor', 'pointer');
         $('#Save-Profile-Content').addClass('Save-Profile-Active');
      } else {
         console.log('Save button function, variable is empty');
         return false;
      }
   }

   //SaveButton('Activate');
   //SaveButton('Disable');

   // ---------- START: IMG validation and preview ---------- //


   // On click open files
   $('#Content-Image-Text, #Profile-Img-Edit').click(function() {
      $('#Profile-Img-Src').trigger('click');
   });

   // OnClick remove image, and set default
   $('.Profile-Img-Close').click(function() {

      // Remove input value
      $('#Profile-Img-Src').val('');

      // Change to fallback image
      $('#Profile-Img-Edit').attr('src', Old_Img_Val);

      // Removes FormData value
      ProfileUpdateData.delete('ImgSrc');

      // Remove any error messages
      $("#Img-Error-Limit, #Img-Error-Current").empty();

      // Make the button disappear after click
      $('.Profile-Img-Close').css('display', 'none');

   });

   // ---------- START: Img preview ---------- //

   $("#Profile-Img-Src").on("change", function(e) {

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
         $('#Profile-Img-Edit').attr('src', Old_Img_Val);

         // Select image, display none
         //$('#Content-Image-Text').css('display', 'none');

         // Empty any old messages
         $("#Img-Error-Limit, #Img-Error-Current").empty();

         // Display error message
         $('#Img-Error-Limit').append('Valid:<br>.png - .jpg - .jpeg');
         $('#Img-Error-Current').append('Current:<br><span>' + fileType.split('/')[1] + '</span>');
         $('.Profile-Img-Error').css('display', 'flex');

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
         $('#Profile-Img-Edit').attr('src', Old_Img_Val);

         // Select image, display none
         //$('#Content-Image-Text').css('opacity', 'none');

         // Empty any old messages
         $("#Img-Error-Limit, #Img-Error-Current").empty();

         // Display error message
         $('#Img-Error-Limit').append('Max:<br>10MB');
         $('#Img-Error-Current').append('Current:<br><span>' + fileSizeFormatted + '</span>');
         $('.Profile-Img-Error').css('display', 'flex');

         ImgVal = false;

         return false;

         // ---------- File size does not meet requirements ---------- //
      } else {

         // ---------- File type and size match requirements ---------- //

         // Make error box disappear
         $('.Profile-Img-Error').css('display', 'none');

         var reader = new FileReader();
         reader.onload = imageIsLoaded;
         reader.readAsDataURL(this.files[0]);

         ImgVal = true;

         // Save image array, and send on form submit
         ProfileUpdateData.append('ImgSrc', this.files[0]);

         $('.Profile-Img-Close').css('display', 'flex');

      }

   });


   // ---------- END: Img preview ---------- //


   // ---------- END: IMG validation and preview ---------- //

   // Change save button to active if all three validations are true
   $('#User-Email-Profile, #User-Phone-Profile, #Profile-Img-Edit').on('input load', function() {

      // ---------- START: EMAIL validation ---------- //

      //Check if input is empty
      if ($('#User-Email-Profile').val().length === 0) {
         // Input is empty

         EmailVal = false;
      } else {
         // Input has length

         function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
         }
         //Check if email is valid
         EmailVal = isEmail($('#User-Email-Profile').val());
      }


      // ---------- END: EMAIL validation ---------- //

      // ---------- START: PHONE validation ---------- //


      //Check if input is empty
      if ($('#User-Phone-Profile').val().length === 0) {
         // Input is empty

         PhoneVal = false;
      } else {
         // Input has length

         function isPhone(phone) {
            var regex = /^[0-9]{8}$/;
            return regex.test(phone);
         }
         //Check if email is valid
         PhoneVal = isPhone($('#User-Phone-Profile').val());
      }


      // ---------- END: PHONE validation ---------- //

      // Store new values
      New_Email_Val = $('#User-Email-Profile').val();
      New_Phone_Val = $('#User-Phone-Profile').val();
      New_Img_Val = $('#Profile-Img-Edit').attr('src');

      // Check if the new phone or email is the same
      if (Old_Email_Val !== New_Email_Val || Old_Img_Val !== New_Img_Val || Old_Phone_Val !== New_Phone_Val) {
         // Check if validation is true on all three
         if (ImgVal == true && EmailVal == true && PhoneVal == true) {
            //Validation done
            SaveButton('Activate');
         } else {
            //Validation failed
            SaveButton('Disable');
         }
      } else {
         // Values are the same
         SaveButton('Disable');

         // Check if validation, and if image changed
         if (ImgVal == true && EmailVal == true && PhoneVal == true && Old_Img_Val !== New_Img_Val) {

            //Validation done
            SaveButton('Activate');

         }


      }

   });

   // On save click check validation, then get and send data
   $('body').on('click', '.Save-Profile-Active', function(event) {

      // Check if validation is done
      if (ImgVal == true && EmailVal == true && PhoneVal == true) {
         // Validation done

         ProfileUpdateData.append('Email', $('#User-Email-Profile').val());
         ProfileUpdateData.append('Phone', $('#User-Phone-Profile').val());

         // ---------- START: Send data to Profile_Update.php ---------- //

         // Variable to hold request
         var Validation;

         // Abort any pending request
         if (Validation) {
            Validation.abort();
         }

         // Fire off the request to php/Partials/Login_Validation.php
         Validation = $.ajax({
            url: "php/Partials/Profile_Update.php",
            type: "post",
            data: ProfileUpdateData,
            dataType: "json",
            async: false,
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable request pages to be cached
            processData: false // To send DOMDocument or non processed data file it is set to false
         });



         // Fired up on success
         Validation.done(function(data) {

            if (data.Status == 'Error') {
               NotifyError(data.Title, data.Message);
            } else if (data.Status == 'Failed') {
               NotifyFailed(data.Title, data.Message);
            } else if (data.Status == 'Done') {

               // Update old values with new phone and email
               Old_Email_Val = data.Data.Email;
               Old_Phone_Val = data.Data.Phone;
               Old_Img_Val = $('#Profile-Img-Edit').attr('src');

               // Update image
               $('#Profile-Img-Main').attr('src', Old_Img_Val);
               $('#Profile-Img-Edit').attr('src', Old_Img_Val);

               // Remove red x button from img
               $('.Profile-Img-Close').css('display', 'none');

               // Disable save button
               SaveButton('Disable');

               NotifyDone(data.Title, data.Message);

            } else {
               NotifyError('Response error', 'Response not recognized');
            }

         })

         // Fired up on failure
         Validation.fail(function(xhr, textStatus, errorThrown) {
            // Do nothing
         })

         // ---------- END: Send data to Profile_Update.php ---------- //
      }

   });

});


// ---------- END: Check validation, if true activate save button ---------- //
