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

  var EventStart = String(ev.start_date);
  var EventEnd = String(ev.end_date);
  var EventDay = EventStart.slice(8, 11);
  var EventMonth = EventStart.slice(4, 8);
  var EventYear = EventStart.slice(11, 16);
  var EventTimeStart = EventStart.slice(16, 21);
  var EventTimeEnd = EventEnd.slice(16, 21);


  //init and sets date to current
  scheduler.init('scheduler_here', new Date(yyyy, mm, dd), "week");

  //Gets all events from xml and loads it in the calendar
  scheduler.load("../data/Lecture.xml");


}
