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

  scheduler.config.details_on_create = true;
  scheduler.config.details_on_dblclick = true;
  //Set date format for xml data
  scheduler.config.xml_date = "%d-%m-%Y %H:%i";
  scheduler.config.first_hour = 8;
  scheduler.config.last_hour = 17;


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
    x_size: 24,
    x_start: 16,
    x_length: 48,
    y_unit: elements,
    y_property: "section_id",
    render: "tree",
    fit_events: true,
    folder_dy: 50,
    dy: 50,
    event_dy: 50
  });

  scheduler.attachEvent("onTemplatesReady", function() {
    scheduler.templates.event_bar_text = function(start, end, event) {
      return event.major;
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
      name: "description",
      height: 40,
      map_to: "major",
      type: "textarea",
      focus: true
    },
    {
      name: "custom",
      height: 23,
      type: "timeline",
      options: null,
      map_to: "section_id"
    }, //type should be the same as name of the tab
    {
      name: "time",
      height: 72,
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

$('#TestDate').val(yyyy + "-" + mm + "-" + dd);


setInterval(function() {

var InputDate = $('#TestDate').val();

console.log(InputDate);


}, 1000);
