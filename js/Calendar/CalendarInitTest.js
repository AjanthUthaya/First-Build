function init() {
  //Get json and put it into a javascript object
  var TestData = (function() {
    var TestData = null;
    $.ajax({
      'async': false,
      'global': false,
      'cache': false,
      'dataType': "xml",
      'url': "php/Calendar/HomeInit.php",
      success: function(data) {
        TestData = data;
        /*alert("Done loading list of teachers");*/
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
      }
    });
    return TestData;
  })();

  var ev = $(TestData).find("event");

  ev.each(function(i, e) {
    //Declaring values
    var TestEv = {
      id: $(this).find('id').text(),
      type: $(e).attr("type"),
      start_date: $(this).find('start_date').text(),
      end_date: $(this).find('end_date').text(),
      teacher_id: $(this).find('teacher_id').text(),
      title: $(this).find('title').text(),
      sub: $(this).find('sub').text(),
      room: $(this).find('room').text(),
      color: $(this).find('color').text(),
      vgs: $(this).find('vgs').text(),
      ava: $(this).find('ava').text(),
      ava_max: $(this).find('ava_max').text(),
      details: $(this).find('details').text()
    };

    var EventStart = String(TestEv.start_date);
    var EventEnd = String(TestEv.end_date);
    var EventDay = EventStart.slice(0, 2);
    var EventMonth = EventStart.slice(3, 5);
    var EventYear = EventStart.slice(6, 10);
    var EventTimeStart = EventStart.slice(11, 16);
    var EventTimeEnd = EventEnd.slice(11, 16);
    var DayLetterArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    var d = new Date(EventMonth + "/" + EventDay + "/" + EventYear);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var EventDayLetter = weekday[d.getDay()];

    //EventMonth = value of Month + " "(space)
    switch (EventMonth) {
      case "01":
        EventMonth = "January";
        break;
      case "02":
        EventMonth = "February";
        break;
      case "03":
        EventMonth = "March";
        break;
      case "04":
        EventMonth = "April";
        break;
      case "05":
        EventMonth = "May";
        break;
      case "06":
        EventMonth = "June";
        break;
      case "07":
        EventMonth = "July";
        break;
      case "08":
        EventMonth = "August";
        break;
      case "09":
        EventMonth = "September";
        break;
      case "10":
        EventMonth = "October";
        break;
      case "11":
        EventMonth = "November";
        break;
      case "12":
        EventMonth = "December";
      default:
        EventMonth = "Refresh or Contact Admin";
    }

    //Html ready to be appended into .Test-Main div
    //TIME
    var Date_Time_Main = "<label class=\"Date-Time\">" + EventTimeStart + " - " + EventTimeEnd + "</label>";


    //DATE
    var Date_Month = "<label class=\"Date-Date-Month\"><i>" + EventMonth + "</i></label>";
    var Date_DayNumber = "<label class=\"Date-Date-DayNumber\">" + EventDay + "</label>";
    var Date_DayLetters = "<label class=\"Date-Date-DayLetters\">" + EventDayLetter + "</label>";

    var Date_Date_Main = "<div class=\"Date-Date\">" + Date_Month + Date_DayNumber + Date_DayLetters + "</div>";


    //TYPE
    var Date_Type = "<label>" + TestEv.sub + "</label>";

    var Date_Type_Main = "<div class=\"Date-Type\">" + Date_Type + "</div>";


    //ROOM
    var Date_Room = "<label>" + TestEv.room + "</label>";

    var Date_Room_Main = "<div class=\"Date-Room\">" + Date_Room + "</div>"


    //MAIN
    var Date_Underlayer = "<div class=\"Date-Underlayer\">" + Date_Time_Main + Date_Date_Main + Date_Type_Main + Date_Room_Main + "</div>";
    var Date_Main = "<data class=\"cell Date-Main\">" + Date_Underlayer + "</data>";

    //Appending here
    $(".Test-Main").append($(Date_Main));

  });

}
