// Format: CountDownTimer('mm/dd/yyyy hh:mm', 'id', 'ss-mm-dd-hh');
// Eksempel CountDownTimer('11/30/2017 10:1 AM', 'NextSecounds', 'ss');
function CountDownTimer(dt, id, Test) {
  var end = new Date(dt);
  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;

  setInterval(function showRemaining() {
    var now = new Date();
    var distance = end - now;
    var Secounds = 0;

    if (distance < 0) {

      document.getElementById(id).innerHTML = 'Nah';

      return;
    }
    var Days = Math.floor(distance / _day);
    var Hours = Math.floor((distance % _day) / _hour);
    var Minutes = Math.floor((distance % _hour) / _minute);
    var Secounds = Math.floor((distance % _minute) / _second);

    $("#NextClassHours").css("display", "none");
    $("#NextClassDays").css("display", "none");

    if (Days > 0) {

      $("#NextClassDays").css("display", "flex");

    } else {

      $("#NextClassHours").css("display", "flex");
      $("#NextClassDays").css("display", "none");

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

var CountDownTo = $("#NextClassHours").attr("CountDownTo");
/*console.log(CountDownTo);*/
CountDownTimer(CountDownTo, 'NextHHours', 'hh');

CountDownTimer(CountDownTo, 'NextHMinutes', 'mm');

CountDownTimer(CountDownTo, 'NextHSecounds', 'ss');


var CountDownTo = $("#NextClassDays").attr("CountDownTo");
/*console.log(CountDownTo);*/
CountDownTimer(CountDownTo, 'NextDDays', 'dd');

CountDownTimer(CountDownTo, 'NextDHours', 'hh');

CountDownTimer(CountDownTo, 'NextDMinutes', 'mm');
