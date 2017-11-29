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

  //Custom hour scale
    scheduler.templates.hour_scale = function(date) {
      var hour = date.getHours();
      var top = '00';
      var bottom = '30';
      if (hour == 0)
        top = 'AM';
      if (hour == 12)
        top = 'PM';
      hour = ((date.getHours() + 11) % 12) + 1;
      var html = '';
      var section_width = Math.floor(scheduler.xy.scale_width / 2);
      var minute_height = Math.floor(scheduler.config.hour_size_px / 2);
      html += "<div class='dhx_scale_hour_main' style='width: " + section_width + "px; height:" + (minute_height * 2) + "px;'>" + hour + "</div><div class='dhx_scale_hour_minute_cont' style='width: " + section_width + "px;'>";
      html += "<div class='dhx_scale_hour_minute_top' style='height:" + minute_height + "px; line-height:" + minute_height + "px;'>" + top + "</div><div class='dhx_scale_hour_minute_bottom' style='height:" + minute_height + "px; line-height:" + minute_height + "px;'>" + bottom + "</div>";
      html += "<div class='dhx_scale_hour_sep'></div></div>";
      return html;
    };

  //Set Start and end calendar
  scheduler.config.first_hour = 8;
  scheduler.config.last_hour = 18;

  //Change calendar to ReadOnly format if = true;
  scheduler.config.readonly = true;

  //Separates events if they have the same time, instead of overlapping
  scheduler.config.separate_short_events = true;

  //Change height of hour scale
  scheduler.config.hour_size_px = 80;

  //Shows multi day evets
  scheduler.config.multi_day = true;

  //init and sets date to current
  scheduler.init('scheduler_here', new Date(yyyy, mm, dd), "week");

  //Gets all events and loads it in
  scheduler.load("../data/Events.xml");

}
