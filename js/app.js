// INIT Foundation js
$(document).foundation();


// NOTE: Create a file for this script
if ($("#User-Menu-Dropdown").length != 0) {
  //Both email and phone class name
  var EmailInput = ".Profile-Content-Email input";
  var PhoneInput = ".Profile-Content-Phone input";

  //Gets value from server
  var ActualEmailVal = "Placeholder@gmail.com";
  var ActualPhoneVal = "46507475";
  //Set value
  $(EmailInput).val(ActualEmailVal);
  $(PhoneInput).val(ActualPhoneVal);

  //$(".Profile-Content-Save").addClass("Profile-Content-Save-Active");









  $(EmailInput + ", " + PhoneInput).on('input', function() {
    //Get current values from fields
    var CurrentEmailVal = $(EmailInput).val();
    var CurrentPhoneVal = $(PhoneInput).val();

    //True = the two varables have the same values
    if (CurrentEmailVal == ActualEmailVal) {
      CurrentEmailAlike = true;
    } else {
      CurrentEmailAlike = false;
    }
    if (CurrentPhoneVal == ActualPhoneVal) {
      CurrentPhoneAlike = true;
    } else {
      CurrentPhoneAlike = false;
    }

    //Changes the button to active
    if (CurrentEmailAlike == false || CurrentPhoneAlike == false) {
      $(".Profile-Content-Save").css("opacity", "1");
      console.log("False");
    } else if (CurrentEmailAlike == true || CurrentPhoneAlike == true) {
      $(".Profile-Content-Save").css("opacity", "0.6");
      console.log("True");
    } else {
      console.log("Error: checking if email values are alike");
    }
  })









  /*  setTimeout(function() {
      console.log(test + " after 5 sec");
    }, 5000);

    setTimeout(function() {
      console.log(test + " after 10 sec");
    }, 10000);*/


} //Ending of does class exist
