function init() {
  //Get json and put it into a javascript object
  var LessonData = (function() {
    var LessonData = null;
    $.ajax({
      'async': false,
      'global': false,
      'cache': false,
      'dataType': "xml",
      'url': "data/Lecture.xml",
      beforeSend: function() {
        //$('#Loading-Main').show();
      },
      success: function(data) {
        //$('#Loading-Main').hide();
        LessonData = data;
        //alert("Done loading list of teachers");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
      }
    });
    return LessonData;
  })();

  var ev = $(LessonData).find("event");

  ev.each(function(i, e) {
    //Declaring values
    var LecEv = {
      id: $(e).attr("id"),
      type: $(e).attr("type"),
      start_date: $(e).attr("start_date"),
      end_date: $(e).attr("end_date"),
      teacherid: $(e).attr("teacherid"),
      title: $(e).attr("title"),
      sub: $(e).attr("sub"),
      room: $(e).attr("room"),
      color: $(e).attr("color"),
      joined: $(e).attr("joined"),
      vgs: $(e).attr("vgs"),
      ava: $(e).attr("ava"),
      maxava: $(e).attr("maxava"),
      details: $(e).attr("details")
    };

    var EventStart = String(LecEv.start_date);
    var EventEnd = String(LecEv.end_date);
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
    //DATE
    var Item_Date_Month = "<label class=\"Date-Circle-Month\">" + EventMonth + "</label>";
    var Item_Date_DayN = "<label class=\"Date-Circle-DayN\">" + EventDay + "</label>";
    var Item_Date_DayL = "<label class=\"Date-Circle-DayL\">" + EventDayLetter + "</label>";

    var Item_Date_Main = "<div class=\"Item-Date\"><div class=\"Item-Date-Circle\">" + Item_Date_Month + Item_Date_DayN + Item_Date_DayL + "</div></div>";


    //TITLE
    var Item_Title_Title = "<h4>" + LecEv.title + "</h4>";
    var Item_Title_Main = "<div class=\"Item-Title\" style=\"background:" + LecEv.color + ";\">" + Item_Title_Title + "</div>";


    //CONTENT
    var Item_Content_Line = "<hr>";
    var Item_Content_Time = "<li><span class=\"fa fa-clock-o\"></span><label>" + EventTimeStart + " - " + EventTimeEnd + "</label></li>";
    var Item_Content_Room = "<li><span class=\"fa fa-home\"></span><label>Room " + LecEv.room + "</label></li>";
    var Item_Content_Ava = "<li><span class=\"fa fa-users\"></span><label>" + LecEv.ava + " / " + LecEv.maxava + "</label></li>";

    var Item_Content_Main = "<div class=\"Item-Content\"><ul class=\"vertical menu align-center\">" + Item_Content_Time + Item_Content_Room + Item_Content_Ava + "</ul></div>";


    //Main
    var Item_Main = "<data class=\"cell\"><div class=\"Lesson-Item-Content\">" + Item_Date_Main + Item_Title_Main + Item_Content_Main + "</div></data>";


    //Appending here
    $(".Lesson-Item").append(Item_Main);

  });

}
