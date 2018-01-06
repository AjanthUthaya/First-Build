//Gets current day, month and year
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}

function init() {

  scheduler.config.details_on_dblclick = true;
  //Set date format for xml data
  scheduler.config.xml_date = "%d-%m-%Y %H:%i";
  scheduler.config.first_hour = 8;
  scheduler.config.last_hour = 17;
  //Removes the whitespace on right side of calendar
  scheduler.xy.scroll_width = 0;
  scheduler.config.container_autoresize = true;
  //Sets the esc key to close lightbox
  scheduler.keys.edit_cancel = 27;
  //Disables save on enter
  scheduler.keys.edit_save = false;

  // NOTE: Working but requires refresh if you resize the screen
  if ($(document).width() < 800) {
    //Makes the lightbox wide if = true;
    scheduler.config.wide_form = false;
  } else {
    //Makes the lightbox wide if = true;
    scheduler.config.wide_form = true;
  }

  //===============
  //Configuration
  //===============

  var elements = [ // original hierarhical array to display
    {
      key: "Room",
      label: "Room",
      open: true,
      children: [{
          key: "204",
          label: "Room 204 (30)"
        },
        {
          key: "205",
          label: "Room 205 (30)"
        },
        {
          key: "206",
          label: "Room 206 (30)"
        }
      ]
    },
    {
      key: "Group",
      label: "Group",
      /*open: true, //to make it open by default*/
      children: [{
          key: "200-A",
          label: "200-A"
        },
        {
          key: "201-A",
          label: "201-A"
        },
        {
          key: "202-A",
          label: "202-A"
        }
      ]
    },
    {
      key: "Special",
      label: "Special",
      /*open: true, //to make it open by default*/
      children: [{
          key: "Training",
          label: "Training"
        },
        {
          key: "Spinning",
          label: "Spinning"
        },
        {
          key: "Dance",
          label: "Dance"
        },
        {
          key: "Lyd",
          label: "Lyd"
        },
        {
          key: "Gym",
          label: "Gym"
        }
      ]
    }
  ];

  // NOTE: Trying to make div "data" scrollable but time stop at a certain point
  //link to possible solutions https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_scale_date_template.html

  scheduler.templates.timeline_scale_date = function(date) {
    var timeline = scheduler.matrix.timeline;
    var func = scheduler.date.date_to_str(timeline.x_date || scheduler.config.hour_date);
    return func(date);
  }

  scheduler.createTimelineView({
    section_autoheight: false,
    name: "timeline",
    x_unit: "minute",
    x_date: "%H:%i",
    x_step: 30,
    x_size: 18,
    x_start: 16,
    x_length: 48,
    y_unit: elements,
    y_property: "room",
    render: "tree",
    fit_events: true,
    folder_dy: 50,
    folder_dx: 50,
    dy: 50,
    event_dy: 46
  });

  scheduler.templates.event_class = function(start, end, event) {

    if (event.xml != "Test") {
      $(this).css("opacity", "0.5");
      return "Event-Disabled";
    } else {
      return "";
    }
  };

  scheduler.attachEvent("onTemplatesReady", function() {
    scheduler.templates.event_bar_text = function(start, end, event) {
      var EventStart = String(event.start_date);
      var EventEnd = String(event.end_date);
      var EventDay = EventStart.slice(8, 11);
      var EventMonth = EventStart.slice(4, 8);
      var EventYear = EventStart.slice(11, 16);
      var EventTimeStart = EventStart.slice(16, 21);
      var EventTimeEnd = EventEnd.slice(16, 21);
      if (event.xml == "Test") {
        return "<div class=\"Event-Content-Main\"><label class=\"Event-Content-Time\">" + EventTimeStart + " - " + EventTimeEnd + "</label><label class=\"Event-Content-Type\">" + event.type + "</label></div>";
      } else if (event.vgs == "1") {

        return "VGS 1";

      } else if (event.xml == "Lecture") {
        scheduler.getEvent(event.id).readonly = true; //Makes all the lectures un-editable
        return "<div class=\"Event-Content-Main\"><label class=\"Event-Content-Time\">" + EventTimeStart + " - " + EventTimeEnd + "</label><label class=\"Event-Content-Type\">" + event.major + "</label></div>";
      }

    }

  });


  scheduler.config.readonly_form = false;
  //This function below is for resizing screen, not resizing of an element
  /*  scheduler.attachEvent("onSchedulerResize", function() {
      console.log("Resizing");
    });*/

  //Custom header for lightbox
  scheduler.templates.lightbox_header = function(start, end, event) {
    //event.major to get major from xml
    //Make it so "Lecture" does not have a delete button
    if (event.xml == "Test") {
      return "<div class='Lightbox-Header-Main' style='background: " + event.color + ";'><a class=\"dhx_delete_btn\" id=\"deleteButton\"><span class=\"fa fa-trash\" onClick=\"document.getElementById('deleteButton').click()\"></span></a><label class=\"Lightbox-Header-Title\">Major</label><a class=\"dhx_cancel_btn\">X</a></div>";
    } else if (event.xml == "Lecture") {
      return "<div class='Lightbox-Header-Main' style='background: " + event.color + ";'><label class=\"Lightbox-Header-Title\">Major</label><a class=\"dhx_cancel_btn\">X</a></div>";
    } else {
      return "<div class='Lightbox-Header-Main' style='background: " + event.color + ";'><label class=\"Lightbox-Header-Title\">Major</label><a class=\"dhx_cancel_btn\">X</a></div>";
    }
  };


  // NOTE: Make a function that prevents events that are readonly from being draged

  scheduler.attachEvent("onBeforeDrag", function(id, mode, e) {

    var ev = scheduler.getEvent(id);

    if (ev == null || ev.xml == "Test") {
      return true;
    } else if (ev.xml == "Lecture") {
      return false;
    } else {
      return true;
    }

  });

  scheduler.attachEvent("onEventCreated", function(id) {
    var ev = scheduler.getEvent(id);
    ev.type = "Test";
    ev.vgs = "All";
    ev.color = "#36414d";
    ev.xml = "Test";
    ev.maxava = "30";
    ev.details = "";
  });


  //Set content before lightbox opens
  scheduler.attachEvent("onBeforeLightbox", function(id) {

    var ev = scheduler.getEvent(id);

    var EventStart = String(ev.start_date);
    var EventEnd = String(ev.end_date);
    var EventDay = EventStart.slice(8, 11);
    var EventMonth = EventStart.slice(4, 8);
    var EventYear = EventStart.slice(11, 16);
    var EventTimeStart = EventStart.slice(16, 21);
    var EventTimeEnd = EventEnd.slice(16, 21);
    var DayLetterArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var EventDayLetter = DayLetterArray[Number(EventDay) - 1];

    //EventMonth = value of Month + " "(space)
    switch (EventMonth) {
      case "Jan ":
        EventMonth = "January";
        break;
      case "Feb ":
        EventMonth = "February";
        break;
      case "Mar ":
        EventMonth = "March";
        break;
      case "Apr ":
        EventMonth = "April";
        break;
      case "May ":
        EventMonth = "May";
        break;
      case "Jun ":
        EventMonth = "June";
        break;
      case "Jul ":
        EventMonth = "July";
        break;
      case "Aug ":
        EventMonth = "August";
        break;
      case "Sep ":
        EventMonth = "September";
        break;
      case "Oct ":
        EventMonth = "October";
        break;
      case "Nov ":
        EventMonth = "November";
        break;
      case "Dec ":
        EventMonth = "December";
      default:
        EventMonth = "Refresh or Contact Admin";
    }

    var Cal_Time = "<label class=\"Cal-Time\">" + EventTimeStart + " - " + EventTimeEnd + "</label>";
    var Cal_Date_MonthLetter = "<label class=\"Cal-Date-MonthLetter\">" + EventMonth + "</label>";
    var Cal_Date_DayNumber = "<label class=\"Cal-Date-DayNumber\">" + EventDay + "</label>";
    var Cal_Date_DayLetter = "<label class=\"Cal-Date-DayLetter\">" + EventDayLetter + "</label>";

    var Cal_Date = "<div class=\"Cal-Date\">" + Cal_Date_MonthLetter + Cal_Date_DayNumber + Cal_Date_DayLetter + "</div>";
    var Cal_Type = "<label class=\"Cal-Type\" style=\"background:" + ev.color + ";\">" + ev.type + "</label>";
    var Cal_Room = "<label class=\"Cal-Room\">" + ev.room + "</label>";
    var Lightbox_Content_Block = "<div class=\"Lightbox-Content-Block\">" + Cal_Time + Cal_Date + Cal_Type + Cal_Room + "</div>";

    var Input_VGS = "<div class=\"Input-VGS\"><label>VGS</label><input value=\"" + ev.vgs + "\" autofocus></input></div>";
    var Input_Color = "<div class=\"Input-Color\"><label>Color</label><input type=\"color\" id=\"ColorSelector\" class=\"jscolor\" value=\"" + ev.color + "\"></input></div>";
    var Input_AVA = "<div class=\"Input-AVA\"><label>AVA</label><input value=\"" + ev.maxava + "\"></input></div>";
    var Lightbox_Content_Input = "<div class=\"Lightbox-Content-Input\">" + Input_VGS + Input_Color + Input_AVA + "</div>";

    var Lightbox_Content_Text = "<div class=\"Lightbox-Content-Text\"><label class=\"fa fa-wpforms\"></label><textarea>" + ev.details + "</textarea></div>";

    var Lightbox_Content_Teacher;

    var Lightbox_Save = "<a class=\"Lightbox-Content-Save dhx_save_btn\">Save</a>";

    var Lightbox_Content_Main = "<div class=\"Lightbox-Content-Main\">" + "<div class=\"Lightbox-Content-First\">" + Lightbox_Content_Block + Lightbox_Content_Input + "</div>" + Lightbox_Content_Text + "</div>" + Lightbox_Save;
    ev.my_template = Lightbox_Content_Main;

    //Set custom style to lightbox
    /*    scheduler.showCover = function(box) {
          if (box) {
            box.style.display = "block";


            var Width = $(".Lightbox-Content-Main").width();
            console.log(Width);
            //set custom position
            box.style.left = "10px";
            box.style.top = "100px";
          }

          scheduler.show_cover();
        }*/

    return true;

  });


  scheduler.attachEvent("onLightbox", function(id) {

    var ev = scheduler.getEvent(id);
    // Header-Main .dhx_title
    // Content-Main .dhx_cal_larea
    //Lightbox .dhx_cal_light

    //Set the ev.id value to element as id
    $('.dhx_cal_light').attr('id', ev.id);


    //Function: lightbox center of screen
    jQuery.fn.center = function() {
      this.css("position", "absolute");
      this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
      this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
      return this;
    }

    $('#' + ev.id).center();
    $(".Input-VGS input").focus();

    //OnClick Run script that makes header and Cal-Type change Color
    $("#ColorSelector").click(function() {
      $("#ColorSelector").on("change", function() {
        //Get Color
        var color = $("#ColorSelector").val();
        //apply cuurent color to divs
        $(".Cal-Type").css("background", color);
        $(".Lightbox-Header-Main").css("background", color);

      });
    });

    //On save button click
    $(".dhx_save_btn").click(function() {
      //Get values from input fields(NEW VALUES)
      var NewVgs = $('.Input-VGS input').val();
      var NewColor = $('.Input-Color input').val();
      var NewMaxAva = $('.Input-AVA input').val();
      var NewDetails = $('.Lightbox-Content-Text textarea').val();


      //Gets event values(OLD VALUES)
      var ev = scheduler.getEvent(scheduler.getState().lightbox_id);


      //Update data here
      if (ev.xml == "Test") {
        ev.vgs = NewVgs;
        ev.color = NewColor;
        ev.maxava = NewMaxAva;
        ev.details = NewDetails;
      }

      //Ends or closes lightbox
      scheduler.endLightbox(true, document.getElementById(ev.id));
    });

  });
  /*  //For saving custom fields
    scheduler.attachEvent("onEventSave", function(id, ev, is_new) {
      var ev = scheduler.getEvent(id);
      var bla = $('#TestId').val();
      ev.room = bla; //changes event's data
      scheduler.updateEvent(ev); // renders the updated event
      console.log("Saving");
      return true;
    })*/


  //https://docs.dhtmlx.com/scheduler/template.html to change view, this below is just basic config
  scheduler.config.lightbox.sections = [{
    name: "test",
    type: "template",
    map_to: "my_template"
  }]

  //Removes all buttons in lightbox
  scheduler.config.buttons_left = "";
  scheduler.config.buttons_right = "";

  //init and sets date to current
  scheduler.init('scheduler_here', new Date(yyyy, mm, dd), "timeline");

  //Gets all events and loads it in
  scheduler.load("../data/Test.xml");
  scheduler.load("../data/Lecture.xml");

  //For picking date and updating current view
  /*scheduler.setCurrentView(new Date(2012,7,4));*/

}

/*
//Script for input, so that the active view changes to that date. Mission on variable change only, update active view
$('#TestDate').val(yyyy + "-" + (mm + 1) + "-" + dd);


setInterval(function() {

  var InputDate = $('#TestDate').val();
  var Year = InputDate.substr(0, 4);
  var Month = InputDate.substr(5, 2);
  var Day = InputDate.substr(8, 2);
  // console.log(InputDate);
  // console.log(Year + "-" + Month + "-" + Day);


  // displays the yyyy,mm,dd in the currently active view
  scheduler.setCurrentView(new Date(Year, Month - 1, Day));


}, 100);*/

function show_minical() {
  if (scheduler.isCalendarVisible()) {
    scheduler.destroyCalendar();
  } else {
    scheduler.renderCalendar({
      position: "dhx_minical_icon",
      date: scheduler._date,
      navigation: true,
      handler: function(date, calendar) {
        scheduler.setCurrentView(date);
        scheduler.destroyCalendar()
      }
    });
  }
}

//dhtmlxscheduler_tooltip
var format = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.tooltip_text = function(start, end, event) {
  var EventStart = String(event.start_date);
  var EventEnd = String(event.end_date);
  var EventDay = EventStart.slice(8, 11);
  var EventMonth = EventStart.slice(4, 8);
  var EventYear = EventStart.slice(11, 16);
  var EventTimeStart = EventStart.slice(16, 21);
  var EventTimeEnd = EventEnd.slice(16, 21);
  if (event.xml == "Test") {
    return "Title: " + event.title + "<br>Date: " + EventDay + " " + EventMonth + " " + EventYear + "<br>Time: " + EventTimeStart + " - " + EventTimeEnd;
  } else if (event.xml == "Lecture") {
    return "Title: " + event.major + "<br>Date: " + EventDay + " " + EventMonth + " " + EventYear + "<br>Time: " + EventTimeStart + " - " + EventTimeEnd;
  }

};


//Close lightbox on click outside of the lightbox
dhtmlxEvent(document.body, "click", function(e) {
  var boxId = scheduler.getState().lightbox_id;
  if (boxId) {
    var el = e ? e.target : event.srcElement,
      cover = document.querySelector(".dhx_cal_cover");

    if (cover && cover.contains(el)) {
      var box = scheduler.getLightbox();
      scheduler.endLightbox(false, box);
    }
  }
});
