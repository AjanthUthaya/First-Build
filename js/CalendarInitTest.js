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
  //Resizes the calendars height, but it needs dhtmlxscheduler_container_autoresize.js script added
  scheduler.config.container_autoresize = false;
  //Removes the whitespace on right side of calendar
  scheduler.xy.scroll_width = 0;


  //===============
  //Configuration
  //===============

  var elements = [ // original hierarhical array to display
    {
      key: 10,
      label: "Block-A",
      open: true,
      children: [{
          key: 100,
          label: "Room 100"
        },
        {
          key: 60,
          label: "Linda Brown"
        },
        {
          key: 70,
          label: "George Lucas"
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

  scheduler.createTimelineView({
    section_autoheight: false,
    name: "timeline",
    x_unit: "minute",
    x_date: "%H:%i",
    x_step: 30,
    x_size: 19,
    x_start: 16,
    x_length: 48,
    y_unit: elements,
    y_property: "section_id",
    render: "tree",
    fit_events: true,
    folder_dy: 50,
    dy: 50,
    event_dy: 46
  });

  scheduler.attachEvent("onTemplatesReady", function() {
    scheduler.templates.event_bar_text = function(start, end, event) {
      return event.title;
    }
  });
  //This function below is for resizing screen, not resizing of an element
  /*  scheduler.attachEvent("onSchedulerResize", function() {
      console.log("Resizing");
    });*/



  //===============
  //Data loading
  //===============
  scheduler.config.lightbox.sections = [{
      name: "Major",
      height: 40,
      map_to: "major",
      type: "select",
      focus: true,
      options: [{
          key: 1,
          label: "Naturfag"
        },
        {
          key: 2,
          label: "Norsk"
        },
        {
          key: 3,
          label: "Nynorsk"
        }
      ]
    },
    {
      name: "Room",
      height: 23,
      type: "timeline",
      options: null,
      map_to: "section_id"
    }, //type should be the same as name of the tab
    {
      name: "time",
      height: 120,
      type: "time",
      map_to: "auto"
    }
  ]

  //init and sets date to current
  scheduler.init('scheduler_here', new Date(yyyy, mm, dd), "timeline");

  //Gets all events and loads it in
  scheduler.load("../data/Test.xml");

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
  return "<b>Event:</b> " + event.text + "<br/><b>Start date:</b> " +
    format(start) + "<br/><b>End date:</b> " + format(end);
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
