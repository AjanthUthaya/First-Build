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

$('#Loading-Main').hide();

function init() {
  scheduler.config.details_on_dblclick = true;
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
  //Removes the whitespace on right side of calendar
  scheduler.xy.scroll_width = 0;
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

  //Targets all events with corresponding results and gives you the ability to set a class
  /*  scheduler.templates.event_class = function(start, end, event) {
      if (event.title == 'Naturfag') return "Major-Naturfag";

      //Returns a default css class if none of the above match
      return "Default-Event";
    };*/

  scheduler.attachEvent("onTemplatesReady", function() {
    scheduler.templates.event_text = function(start, end, event) {
      return "<div class=\"Content\"><div class=\"Major\"><b>" + event.title + "</b></div> <div class=\"Sub\"><i>" + event.sub + "</i></div></div> <div class=\"Room\"><i>" + event.room + "</i></div>";
    }
  });

  scheduler.attachEvent("onBeforeDrag", function() {
    //Leave this in if you want to disable the user from being able to create events by dragging
  });

  scheduler.attachEvent("onclick", function() {
    //Leave this in if you want to disable options from popping up when user clicks on a event
  });


  //On double click show lightbox
  scheduler.config.details_on_dblclick = true;

  //Disables create event on double click
  scheduler.config.dblclick_create = false;

  //Set Start and end calendar
  scheduler.config.first_hour = 8;
  scheduler.config.last_hour = 18;

  //Change calendar to ReadOnly format if = true;
  /*scheduler.config.readonly = true;*/

  //Change calendar to ReadOnly format if = true, but gives the user the pop-up form(no edit);
  scheduler.config.readonly_form = true;

  //Separates events if they have the same time, instead of overlapping
  scheduler.config.separate_short_events = true;

  //Change height of hour scale
  scheduler.config.hour_size_px = 80;

  //Shows multi day evets
  scheduler.config.multi_day = true;

  //Removes all buttons in lightbox
  scheduler.config.buttons_left = "";
  scheduler.config.buttons_right = "";


  // NOTE: Working but requires refresh if you resize the screen
  if ($(document).width() < 800) {
    //Makes the lightbox wide if = true;
    scheduler.config.wide_form = false;
  } else {
    //Makes the lightbox wide if = true;
    scheduler.config.wide_form = true;
  }

/*  scheduler.attachEvent("onDataRender", function(i) {
    $("#Loading-Main").toggle();
  });*/

  //init and sets date to current
  scheduler.init('scheduler_here', new Date(yyyy, mm, dd), "week");

  //Gets all events from xml and loads it in the calendar
  scheduler.load("../data/Lecture.xml", "xml");


  //Custom header for lightbox
  scheduler.templates.lightbox_header = function(start, end, event) {
    //event.title to get major from xml
    return "<div class='Lightbox-Header-Main' style='background: " + event.color + ";'><span>" + event.title + "</span><a class=\"dhx_cancel_btn\">x</a></div>";
  };


  //Custom lightbox for events detail pop-up on double click
  scheduler.form_blocks["my_editor"] = {
    render: function(sns) { // sns - section configuration object


      var Lightbox_Content_Main_Title = "<label class=\"Lightbox-Content-Main-Title\">Sub major</label>";
      var Lightbox_Content_Main_Content = "<p class=\"Lightbox-Content-Main-Content\">Main content</p>";
      var Lightbox_Content_Main = "<div class=\"Lightbox-Content-Main\">" + Lightbox_Content_Main_Title + Lightbox_Content_Main_Content + "</div>";


      var Footer_DateTime_Date = "<div class=\"Footer-DateTime-Date\"><span class=\"fa fa-calendar-o\"></span><label>Date(dd-mm-yyyy)</label></div>";
      var Footer_DateTime_Time = "<div class=\"Footer-DateTime-Time\"><span class=\"fa fa-clock-o\"></span><label>Time(hh:mm - hh:mm)</label></div>";
      var Lightbox_Footer_Main_DateTime = "<div class=\"Lightbox-Footer-Main-DateTime\">" + Footer_DateTime_Date + Footer_DateTime_Time + "</div>";

      var Footer_Main_Room = "<div class=\"Footer-Main-Room\"><span class=\"fa fa-home\"></span><label>Room(roomNR (block X))</label></div>";
      var Footer_Main_Ava = "<div class=\"Footer-Main-Ava\"><span class=\"fa fa-users\"></span><label>Ava(current / max)</label></div>";
      var Lightbox_Footer_Main_RoomAva = "<div class=\"Lightbox-Footer-Main-RoomAva\">" + Footer_Main_Room + Footer_Main_Ava + "</div>";

      var Lightbox_Footer_Main = "<div class=\"Lightbox-Footer-Main\">" + Lightbox_Footer_Main_DateTime + Lightbox_Footer_Main_RoomAva + "</div>";

      var space = " ";


      return "<div class=\"Lightbox-Content\">" + Lightbox_Content_Main + Lightbox_Footer_Main + "</div>";


    },
    set_value: function(node, value, ev) {
      // node - HTML object related to HTML defined above
      // value - value defined by map_to property
      // ev - event object
      /*   //Old way of setting data values
        node.childNodes[1].value = ev.title || "";
        node.childNodes[4].value = ev.details || "";
        node.childNodes[5].childNodes[1].value = ev.details || "";
      */

      //New way of setting data values
      //$(Selector).text(For replacing text inside element);
      //$(Selector).val(For replacing value inside element);

      //Sub Title
      $(".Lightbox-Content-Main-Title").text(ev.sub);
      //Content
      $(".Lightbox-Content-Main-Content").text(ev.details);


      var EventStart = String(ev.start_date);
      var EventEnd = String(ev.end_date);
      var EventDay = EventStart.slice(8, 11);
      var EventMonth = EventStart.slice(4, 8);
      var EventYear = EventStart.slice(11, 16);
      var EventTimeStart = EventStart.slice(16, 21);
      var EventTimeEnd = EventEnd.slice(16, 21);

      //Date
      $(".Footer-DateTime-Date label").text(EventDay + " " + EventMonth + " " + EventYear);
      //Time
      $(".Footer-DateTime-Time label").text(EventTimeStart + " - " + EventTimeEnd);

      //Room
      $(".Footer-Main-Room label").text(ev.room);
      //Ava
      $(".Footer-Main-Ava label").text(ev.ava);

    }
    /*,
        get_value: function(node, ev) {
          // node - HTML object related to HTML defined above
          // event object

        }*/
  }


  //This part has display: none; as value
  scheduler.config.lightbox.sections = [{
    name: "SubMajor",
    height: 200,
    map_to: "text",
    type: "my_editor",
    focus: false
  }]

  scheduler.attachEvent("onLightbox", function(id) {
    var ev = scheduler.getEvent(id);

    //Set the ev.id value to element as id
    $('.dhx_cal_light').attr('id', ev.id);

    jQuery.fn.center = function() {
      this.css("position", "absolute");
      this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
      this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
      return this;
    }

    $('#' + ev.id).center();
  });


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


}
