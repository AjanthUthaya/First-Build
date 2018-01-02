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
      key: 10,
      label: "Block-A",
      open: true,
      children: [{
          key: 204,
          label: "Room 204 (30)"
        },
        {
          key: 205,
          label: "Room 205 (30)"
        },
        {
          key: 206,
          label: "Room 206 (30)"
        }
      ]
    },
    {
      key: 110,
      label: "Block-B",
      /*open: true, //to make it open by default*/
      children: [{
          key: 80,
          label: "Kate Moss"
        },
        {
          key: 90,
          label: "Dian Fossey"
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


  //Set content before lightbox opens
  scheduler.attachEvent("onBeforeLightbox", function(id) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<input id=\"TestId\" value='" + ev.block + "'></input>";
    return true;
  });


  //For saving custom fields
  scheduler.attachEvent("onEventSave", function(id, ev, is_new) {
    var ev = scheduler.getEvent(id);
    var bla = $('#TestId').val();
    ev.block = bla; //changes event's data
    scheduler.updateEvent(ev); // renders the updated event


    return true;
  })

  //https://docs.dhtmlx.com/scheduler/template.html to change view, this below is just basic config
  scheduler.config.lightbox.sections = [{
    name: "test",
    height: 40,
    type: "template",
    map_to: "my_template"
  }]

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

//Delete event on backspace
scheduler.addShortcut("backspace", function(e) {
  var eventId = scheduler.getState().select_id;
  if (eventId)
    scheduler.deleteEvent(eventId);
}, "event");
