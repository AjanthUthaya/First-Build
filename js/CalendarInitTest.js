function init() {
  //Get json and put it into a javascript object
  var LectureData = (function() {
    var LectureData = null;
    $.ajax({
      'async': false,
      'global': false,
      'cache': false,
      'dataType': "xml",
      'url': "data/Test.xml",
      beforeSend: function() {
        $('#Loading-Main').show();
      },
      success: function(data) {
        $('#Loading-Main').hide();
        LectureData = data;
        /*alert("Done loading list of teachers");*/
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
      }
    });
    return LectureData;
  })();

  var ev = $(LectureData).find("event");

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

    //Html ready to be appended into .Test-Main div
    //DATE
    var Date_Month = "<label class=\"Date-Date-Month\"><i>November</i></label>";
    var Date_DayNumber = "<label class=\"Date-Date-DayNumber\">24</label>";
    var Date_DayLetters = "<label class=\"Date-Date-DayLetters\">Friday</label>";

    var Date_Date_Main = "<div class=\"Date-Date\">" + Date_Month + Date_DayNumber + Date_DayLetters + "</div>";


    //TYPE
    var Date_Type = "<label>Exam</label>";

    var Date_Type_Main = "<div class=\"Date-Type\">" + Date_Type + "</div>";


    //ROOM
    var Date_Room = "<label>249</label>";

    var Date_Room_Main = "<div class=\"Date-Room\">" + Date_Room + "</div>"


    //MAIN
    var Date_Underlayer = "<div class=\"Date-Underlayer\">" + Date_Date_Main + Date_Type_Main + Date_Room_Main + "</div>";
    var Date_Main = "<data class=\"cell Date-Main\">" + Date_Underlayer + "</data>";

    //Appending here
    $(".Test-Main").append($(Date_Main));

  });

}
