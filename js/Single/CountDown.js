// Format: CountDownTimer('mm/dd/yyyy hh:mm', 'id', 'ss-mm-dd-hh');
// Eksempel: CountDownTimer('11/30/2017 10:1 AM', 'NextSecounds', 'ss');
$(document).ready(function() {

  function CountDownTimer(dt, id, Test) {
    var end = new Date(dt);
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    var now = new Date();
    var distance = end - now;
    var Secounds = 0;


    var Days = Math.floor(distance / _day);
    var Hours = Math.floor((distance % _day) / _hour);
    var Minutes = Math.floor((distance % _hour) / _minute);
    var Secounds = Math.floor((distance % _minute) / _second);


    if (Days > 0) {

      $("#NextClassDays").css("display", "flex");
      $("#NextClassMajor").css("display", "block");

    } else {

      if (distance < 0) {

        document.getElementById(id).innerHTML = 'Nah';
        $("#NextClassNo").css("display", "flex");
        $("#NextClassMajor").css("display", "none");

      } else {
        $("#NextClassHours").css("display", "flex");
        $("#NextClassMajor").css("display", "block");
        $("#NextClassDays").css("display", "none");
      }


    }

    if (Test == 'dd') {

      document.getElementById(id).innerHTML = Days;
      /*console.log("dd");*/

    } else if (Test == 'hh') {

      document.getElementById(id).innerHTML = Hours;
      /*console.log("hh");*/

    } else if (Test == 'mm') {

      document.getElementById(id).innerHTML = Minutes;
      /*console.log("ss");*/

    } else if (Test == 'ss') {

      document.getElementById(id).innerHTML = Secounds;
      /*console.log("ss");*/

    }

    setInterval(function showRemaining() {
      var now = new Date();
      var distance = end - now;
      var Secounds = 0;


      var Days = Math.floor(distance / _day);
      var Hours = Math.floor((distance % _day) / _hour);
      var Minutes = Math.floor((distance % _hour) / _minute);
      var Secounds = Math.floor((distance % _minute) / _second);


      if (Days > 0) {

        $("#NextClassDays").css("display", "flex");
        $("#NextClassMajor").css("display", "block");

      } else {

        if (distance < 0) {

          document.getElementById(id).innerHTML = 'Nah';
          $("#NextClassNo").css("display", "flex");
          $("#NextClassMajor").css("display", "none");

        } else {
          $("#NextClassHours").css("display", "flex");
          $("#NextClassMajor").css("display", "block");
          $("#NextClassDays").css("display", "none");
        }


      }

      if (Test == 'dd') {

        document.getElementById(id).innerHTML = Days;
        /*console.log("dd");*/

      } else if (Test == 'hh') {

        document.getElementById(id).innerHTML = Hours;
        /*console.log("hh");*/

      } else if (Test == 'mm') {

        document.getElementById(id).innerHTML = Minutes;
        /*console.log("ss");*/

      } else if (Test == 'ss') {

        document.getElementById(id).innerHTML = Secounds;
        /*console.log("ss");*/

      }

    }, 1000); // replace every 1000 millisecond = 1 sec
  }

  var CountDownTo = $("#NextClassMain").attr("CountDownTo");
  //Code to get hours, minutes and secounds left until dateTime
  CountDownTimer(CountDownTo, 'NextHHours', 'hh');
  CountDownTimer(CountDownTo, 'NextHMinutes', 'mm');
  CountDownTimer(CountDownTo, 'NextHSecounds', 'ss');

  //Code to get days, hours and minutes left until dateTime
  CountDownTimer(CountDownTo, 'NextDDays', 'dd');
  CountDownTimer(CountDownTo, 'NextDHours', 'hh');
  CountDownTimer(CountDownTo, 'NextDMinutes', 'mm');
});
