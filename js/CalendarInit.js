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
  //Set format for date
  scheduler.config.default_date = "%j %M";
  //Set format for date days
  scheduler.config.day_date = "%D, %j";
  //Set format for date, day view
  scheduler.templates.day_scale_date = function(date) {
    return scheduler.date.date_to_str("%l")(date);
  };
  //Sets width for editor field
  scheduler.xy.editor_width = 0;
  //Displaying the current time
  scheduler.config.mark_now = true;

  /*
  %y - the year as a two-digit number ( 00 to 99 );
  %Y - the year as a four-digit number ( 1900-9999 );

  %m - the month as a number with a leading zero ( 01 to 12 );
  %n - the month as a number without a leading zero ( 1 to 12 );
  %M - the month as an abbreviation ( Jan to Dec );
  %F - the month as a full name ( January to December );

  %W - the ISO-8601 week number of the year. Weeks start on Monday;

  %d - the day as a number with a leading zero ( 01 to 31 );
  %j - the day as a number without a leading zero ( 1 to 31 );
  %D - the day as an abbreviation ( Sun to Sat );
  %l - the day as a full name ( Sunday to Saturday );

  %h - the hour based on the 12-hour clock ( 00 to 11 );
  %H - the hour based on the 24-hour clock ( 00 to 23 );
  %g - the hour based on the 12-hour clock without a leading zero ( 1 to 12 );
  %G - the hour based on the 24-hour clock without a leading zero ( 0 to 23 );

  %i - the minute as a number with a leading zero ( 00 to 59 );
  %s - the second as a number with a leading zero ( 00 to 59 );
  %a - displays am (for times from midnight until noon) and pm (for times from noon till midnight);
  %A - displays AM (for times from midnight until noon) and PM (for times from noon till midnight).
  For example, if you want to present 1st June 2013 as 01/06/2013, you need to specify "%d/%m/%Y".
  */

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

  scheduler.templates.event_class = function(start, end, event) {
    if (event.major == 'Naturfag') return "Major-Naturfag";

    //Returns a default css class if none of the above match
    return "Default-Event";
  };

  scheduler.attachEvent("onTemplatesReady", function() {
    scheduler.templates.event_text = function(start, end, event) {
      return "<div class=\"Content\"><div class=\"Major\"><b>" + event.major + "</b></div> <div class=\"Sub\"><i>" + event.sub + "</i></div></div> <div class=\"Room\"><i>" + event.room + "</i></div>";
    }
  });

  //Set Start and end calendar
  scheduler.config.first_hour = 8;
  scheduler.config.last_hour = 18;

  //Change calendar to ReadOnly format if = true;
  scheduler.config.readonly = true;

  //Change calendar to ReadOnly format if = true, but gives the user the pop-up form(no edit);
  /*scheduler.config.readonly_form = true;*/

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
