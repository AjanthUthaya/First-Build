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
  //Set date format for xml data
  scheduler.config.xml_date = "%d-%m-%Y %H:%i";


  scheduler.templates.event_class = function(start, end, event) {
    if (event.major == 'Naturfag') return "Major-Naturfag";

    //Returns a default css class if none of the above match
    return "Default-Event";
  };

  scheduler.attachEvent("onTemplatesReady", function() {
    scheduler.templates.event_text = function(start, end, event) {
      return "<div><b>" + event.major + "</b></div> <div class=\"Sub\"><i>" + event.sub + "</i></div> <div class=\"Room\"><i>" + event.room + "</i></div>";
    }
  });

  //Set Start and end calendar
  scheduler.config.first_hour = 8;
  scheduler.config.last_hour = 18;

  //Separates events if they have the same time, instead of overlapping
  scheduler.config.separate_short_events = true;

  //Change height of hour scale
/*  scheduler.config.hour_size_px = 80;*/

  //Shows multi day evets
/*  scheduler.config.multi_day = true;*/

  //init and sets date to current
  scheduler.init('scheduler_here', new Date(yyyy, mm, dd), "week");

  //Gets all events and loads it in
  scheduler.load("../data/Test.xml");

}
