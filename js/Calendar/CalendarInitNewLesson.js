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

  //Get json and put it into a javascript object
  var RoomArr = (function() {
    var RoomArr = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "data/DataRoom.json",
      'dataType': "json",
      'success': function(data) {
        RoomArr = data;
        /*alert("Done loading list of teachers");*/
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
      }
    });
    return RoomArr;
  })();

  /*  var RoomArr = [ // original hierarhical array to display
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
        //open: true, to make it open by default
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
        //open: true, to make it open by default
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
    ];*/

  // NOTE: Trying to make div "data" scrollable but time stop at a certain point
  //link to possible solutions https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_scale_date_template.html

  scheduler.templates.timeline_scale_date = function(date) {
    var timeline = scheduler.matrix.timeline;
    var func = scheduler.date.date_to_str(timeline.x_date || scheduler.config.hour_date);
    return func(date);
  }

  scheduler.createTimelineView({
    section_autoheight: true,
    name: "timeline",
    x_unit: "minute",
    x_date: "%H:%i",
    x_step: 30,
    x_size: 18,
    x_start: 16,
    x_length: 48,
    y_unit: RoomArr,
    y_property: "room",
    render: "tree",
    fit_events: true,
    folder_dy: 50,
    folder_dx: 50,
    dy: 50,
    event_dy: 46,
  });

  scheduler.templates.event_class = function(start, end, event) {

    if (event.type != "Lecture") {
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
      if (event.type == "Test") {
        return "<div class=\"Event-Content-Main\"><label class=\"Event-Content-Time\">" + EventTimeStart + " - " + EventTimeEnd + "</label><label class=\"Event-Content-Type\">" + event.sub + "</label></div>";
      } else if (event.vgs == "1") {

        return "VGS 1";

      } else if (event.type == "Lecture") {
        scheduler.getEvent(event.id).readonly = true; //Makes all the lectures un-editable
        return "<div class=\"Event-Content-Main\"><label class=\"Event-Content-Time\">" + EventTimeStart + " - " + EventTimeEnd + "</label><label class=\"Event-Content-Type\">" + event.title + "</label></div>";
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
    //event.title to get major from xml
    //Make it so "Lecture" does not have a delete button
    if (event.type == "Lecture") {
      return "<div class='Lightbox-Header-Main' style='background: " + event.color + ";'><a class=\"dhx_delete_btn\" id=\"deleteButton\"><span class=\"fa fa-trash\" onClick=\"document.getElementById('deleteButton').click()\"></span></a><label class=\"Lightbox-Header-Title editable\">" + event.title + "</label><a class=\"dhx_cancel_btn\">X</a></div>";
    } else if (event.type == "Test") {
      return "<div class='Lightbox-Header-Main' style='background: " + event.color + ";'><label class=\"Lightbox-Header-Title\">" + event.title + "</label><a class=\"dhx_cancel_btn\">X</a></div>";
    } else {
      return "<div class='Lightbox-Header-Main' style='background: " + event.color + ";'><label class=\"Lightbox-Header-Title\">" + event.title + "</label><a class=\"dhx_cancel_btn\">X</a></div>";
    }
  };


  // NOTE: Make a function that prevents events that are readonly from being draged

  scheduler.attachEvent("onBeforeDrag", function(id, mode, e) {

    var ev = scheduler.getEvent(id);

    if (ev == null || ev.type == "Lecture") {
      return true;
    } else if (ev.type == "Test") {
      return false;
    } else {
      return true;
    }

  });

  scheduler.attachEvent("onEventCreated", function(id) {
    var ev = scheduler.getEvent(id);
    ev.title = "Select a major"
    ev.sub = "Select sub";
    ev.vgs = "All";
    ev.color = "#36414d";
    ev.type = "Lecture";
    ev.maxava = "30";
    ev.details = "";
    ev.teacherid = "";
  });


  //Get json and put it into a javascript object
  var TeacherList = (function() {
    var TeacherList = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "data/DataTeacher.json",
      'dataType': "json",
      'success': function(data) {
        TeacherList = data;
        /*alert("Done loading list of teachers");*/
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
      }
    });
    return TeacherList;
  })();


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

    var d = new Date(EventMonth + "/" + EventDay + "/" + EventYear);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var EventDayLetter = weekday[d.getDay()];

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

    if (ev.type == "Lecture") {
      var Cal_Time = "<label class=\"Cal-Time\">" + EventTimeStart + " - " + EventTimeEnd + "</label>";
      var Cal_Date_MonthLetter = "<label class=\"Cal-Date-MonthLetter\">" + EventMonth + "</label>";
      var Cal_Date_DayNumber = "<label class=\"Cal-Date-DayNumber\">" + EventDay + "</label>";
      var Cal_Date_DayLetter = "<label class=\"Cal-Date-DayLetter\">" + EventDayLetter + "</label>";

      var Cal_Date = "<div class=\"Cal-Date\">" + Cal_Date_MonthLetter + Cal_Date_DayNumber + Cal_Date_DayLetter + "</div>";
      var Cal_Type = "<label class=\"Cal-Type editable\" style=\"background:" + ev.color + ";\">" + ev.sub + "</label>";
      var Cal_Room = "<label class=\"Cal-Room\">" + ev.room + "</label>";
      var Lightbox_Content_Block = "<div class=\"Lightbox-Content-Block\">" + Cal_Time + Cal_Date + Cal_Type + Cal_Room + "</div>";

      var Input_VGS = "<div class=\"Input-VGS\"><label>VGS</label><select autofocus></select></div>";
      var Input_Color = "<div class=\"Input-Color\"><label>Color</label><input type=\"color\" id=\"ColorSelector\" class=\"jscolor\" value=\"" + ev.color + "\"></input></div>";
      var Input_AVA = "<div class=\"Input-AVA\"><label>AVA</label><input type=\"number\" value=\"" + ev.maxava + "\"></input></div>";
      var Lightbox_Content_Input = "<div class=\"Lightbox-Content-Input\">" + Input_VGS + Input_Color + "</div>";


      var Lightbox_Content_Text = "<div class=\"Lightbox-Content-Text\"><label class=\"fa fa-wpforms\"></label><textarea>" + ev.details + "</textarea></div>";


      var Teacher_Header_Main = "<div class=\"Teacher-Header-Main\"><span class=\"Teacher-Header fa fa-user-circle\"></span></div>";

      var Teacher_Input_Main = "<div id=\"Teacher-Input-Main\"><div id=\"Teacher-Input-Dropdown\"></div></div>";


      var Teacher_List_Main = "<ul class=\"Teacher-List-Main\">" + "</ul>";
      var Teacher_Content_Main = "<div class=\"Teacher-Content-Main\">" + Teacher_Input_Main + Teacher_List_Main + "</div>";

      var Lightbox_Content_Teacher = "<div class=\"Lightbox-Content-Teacher\">" + Teacher_Header_Main + Teacher_Content_Main + "</div>";


      var Lightbox_Save = "<a class=\"Lightbox-Content-Save dhx_save_btn\">Save</a>";

      var Lightbox_Content_Main = "<div class=\"Lightbox-Content-Main\">" + "<div class=\"Lightbox-Content-First\">" + Lightbox_Content_Block + Lightbox_Content_Input + "</div>" + Lightbox_Content_Text + Lightbox_Content_Teacher + "</div>" + Lightbox_Save;
      ev.my_template = Lightbox_Content_Main;
    } else if (ev.type == "Test") {

      var Lightbox_Content_Main_Title = "<label class=\"Lightbox-Content-Main-Title\">" + ev.sub + "</label>";
      var Lightbox_Content_Main_Content = "<p class=\"Lightbox-Content-Main-Content\">" + ev.details + "</p>";
      var Lightbox_Content_Main = "<div class=\"Lightbox-Content-Main\">" + Lightbox_Content_Main_Title + Lightbox_Content_Main_Content + "</div>";


      var Footer_DateTime_Date = "<div class=\"Footer-DateTime-Date\"><span class=\"fa fa-calendar-o\"></span><label>" + EventDay + " " + EventMonth + " " + EventYear + "</label></div>";
      var Footer_DateTime_Time = "<div class=\"Footer-DateTime-Time\"><span class=\"fa fa-clock-o\"></span><label>" + EventTimeStart + " - " + EventTimeEnd + "</label></div>";
      var Lightbox_Footer_Main_DateTime = "<div class=\"Lightbox-Footer-Main-DateTime\">" + Footer_DateTime_Date + Footer_DateTime_Time + "</div>";

      var Footer_Main_Room = "<div class=\"Footer-Main-Room\"><span class=\"fa fa-home\"></span><label>" + ev.room + "</label></div>";
      var Footer_Main_Ava = "<div class=\"Footer-Main-Ava\"><span class=\"fa fa-users\"></span><label>" + ev.ava + " / " + ev.maxava + "</label></div>";
      var Lightbox_Footer_Main_RoomAva = "<div class=\"Lightbox-Footer-Main-RoomAva\">" + Footer_Main_Room + Footer_Main_Ava + "</div>";

      var Lightbox_Footer_Main = "<div class=\"Lightbox-Footer-Main\">" + Lightbox_Footer_Main_DateTime + Lightbox_Footer_Main_RoomAva + "</div>";

      ev.my_template = "<div class=\"Lightbox-Content\">" + Lightbox_Content_Main + Lightbox_Footer_Main + "</div>";
    } else {
      ev.my_template = "Contact admin, event data error(check console log)";
      console.log("Event data error: type does not match any values");
    }

    return true;

  });


  scheduler.attachEvent("onLightbox", function(id) {

    var ev = scheduler.getEvent(id);
    // Header-Main .dhx_title
    // Content-Main .dhx_cal_larea
    //Lightbox .dhx_cal_light

    //Set the ev.id value to element as id
    $('.dhx_cal_light').attr('id', ev.id);

    $('.dd-selected').val(ev.vgs);


    //Function: lightbox center of screen
    jQuery.fn.center = function() {
      this.css("position", "absolute");
      this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
      this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
      return this;
    }

    jQuery.fn.CustomPos = function(x) {
      //X = TopPos
      this.css("position", "absolute");
      this.css("top", Math.max(0, x +
        $(window).scrollTop()) + "px");
      this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
      return this;
    }

    $('#' + ev.id).CustomPos(80);
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


    //Init teacher dropdown
    $('#Teacher-Input-Dropdown').ddslickTeacher({
      data: TeacherList,
      imagePosition: "left",
      onSelected: function(data) {
        //On select run whatever is in here
        $(".Teacher-Input").val("");
        var ddData = $('#Teacher-Input-Dropdown').data('ddslick');

        var evt = data.selectedData;

        var Li_Content_Id = "<input class=\"List-Item-Id\" type=\"hidden\" value=\"" + evt.id + "\">";
        var Li_Content_Image = "<div class=\"List-Item-Image-Main\"><img class=\"List-Item-Image\" src=\"" + evt.imageSrc + "\"></div>";
        var Li_Content_Name = "<label class=\"List-Item-Name\">" + evt.name + "</label>";

        var LI_Content_Details_Email = "<div class=\"List-Item-Detail-Item List-Item-Details-Email\"><span>Email: </span><label>" + evt.email + "</label></div>";
        var LI_Content_Details_Phone = "<div class=\"List-Item-Detail-Item List-Item-Details-Phone\"><span>Phone: </span><label>" + evt.phone + "</label></div>";
        var LI_Content_Details = "<div class=\"List-Item-Details\">" + LI_Content_Details_Email + LI_Content_Details_Phone + "</div>";

        var Li_Content_Main = "<a class=\"List-Item-Option\">" + Li_Content_Id + Li_Content_Image + "<div class=\"List-Item-Info\">" + Li_Content_Name + LI_Content_Details + "</div>" + "</a>";
        var Teacher_List_Li = "<li><div class=\"Teacher-List-Item\">" + Li_Content_Main + "<a class=\"Teacher-Li-Delete\">x</a></div></li>";

        //Script that makes it so that the user can not pick one teacher twice
        /*        $(".dd-options").find(".dd-option-selected").each(function(i) {
                  var li = $(this);
                  var Id = li.find("input").val();

                  console.log(Id);
                });*/
        //Get Value from teacher
        var TeacherLength = $('ul.Teacher-List-Main li').length >= 1;

        //////Checks to see if teacher is already added
        //items cotains id of of teacher/s that are added
        var items = [];
        $(".Teacher-List-Main").find("li").each(function(i) {
          var li = $(this);
          var Id = li.find("input").val();

          items.push(Id);
        });


        //Function to check if value exists inside of array
        function checkValue(value, arr) {
          var status = false;

          for (var i = 0; i < arr.length; i++) {
            var name = arr[i];
            if (name == value) {
              status = true;
              break;
            }
          }

          return status;
        }

        var AlreadyExists = checkValue(data.selectedData.id, items);

        if (AlreadyExists == true) {
          alert("Teacher is already added to this event");
          $(".Teacher-Input").focus();
        } else {
          $(".Teacher-Content-Main .Teacher-List-Main").append(Teacher_List_Li);
        }

      },
      selectText: "Select and add a teacher"
    });

    var ddBasic = [{
        text: "1",
        value: "1",
      },
      {
        text: "2",
        value: "2",
      },
      {
        text: "3",
        value: "3",
      },
      {
        text: "All",
        value: "All",
      }
    ];
    if (ev.vgs == "All") {
      $('.Input-VGS select').ddslickVGS({
        data: ddBasic,
        selectText: "Select VGS",
        onSelected: function(data) {},
        defaultSelectedIndex: 3
      });
    }else {
      $('.Input-VGS select').ddslickVGS({
        data: ddBasic,
        selectText: "Select VGS",
        onSelected: function(data) {},
        defaultSelectedIndex: ev.vgs -1
      });
    }



    //Getting teacher/s id and showing them in Teacher-List-Main
    var ev = scheduler.getEvent(id);
    if (ev.teacherid != "") {

      var TeacherIdArr = ev.teacherid.split("§");
      // Display array values on page
      for (var i = 0; i < TeacherIdArr.length; i++) {
        //console.log(TeacherIdArr[i]);
        arr = jQuery.grep(TeacherList, function(e) {
          if (e.id == TeacherIdArr[i]) {
            return e;
          }
        });

        var evt = arr[0];

        var Li_Content_Id = "<input class=\"List-Item-Id\" type=\"hidden\" value=\"" + evt.id + "\">";
        var Li_Content_Image = "<div class=\"List-Item-Image-Main\"><img class=\"List-Item-Image\" src=\"" + evt.imageSrc + "\"></div>";
        var Li_Content_Name = "<label class=\"List-Item-Name\">" + evt.name + "</label>";

        var LI_Content_Details_Email = "<div class=\"List-Item-Detail-Item List-Item-Details-Email\"><span>Email: </span><label>" + evt.email + "</label></div>";
        var LI_Content_Details_Phone = "<div class=\"List-Item-Detail-Item List-Item-Details-Phone\"><span>Phone: </span><label>" + evt.phone + "</label></div>";
        var LI_Content_Details = "<div class=\"List-Item-Details\">" + LI_Content_Details_Email + LI_Content_Details_Phone + "</div>";

        var Li_Content_Main = "<a class=\"List-Item-Option\">" + Li_Content_Id + Li_Content_Image + "<div class=\"List-Item-Info\">" + Li_Content_Name + LI_Content_Details + "</div>" + "</a>";
        var Teacher_List_Li = "<li><div class=\"Teacher-List-Item\">" + Li_Content_Main + "<a class=\"Teacher-Li-Delete\">x</a></div></li>";
        $(".Teacher-Content-Main .Teacher-List-Main").append(Teacher_List_Li);
        //console.log(evt);
      }
    }

    //Filter on type, for teacher dropdown list
    var TeacherSearch = '.Teacher-Input';
    var TeacherUl = ".dd-options";
    var TeacherLi = ".dd-options li";

    $(TeacherSearch).keyup(function() {
      var valThis = $(this).val().toLowerCase();
      var noresult = 0;
      if (valThis == "") {
        $(TeacherLi).show();
        noresult = 1;
        $('.no-results-found').remove();
      } else {
        $(TeacherLi).each(function() {
          var text = $(this).text().toLowerCase();
          var match = text.indexOf(valThis);
          if (match >= 0) {
            $(this).show();
            noresult = 1;
            $('.no-results-found').remove();
          } else {
            $(this).hide();
          }
        });
      };
      if (noresult == 0) {
        $(".dd-options").append('<li class="no-results-found">No results</li>');
      }
    });


    //Foldable fields OnClick, and store show or hide values with localvalues
    //If localStorage variable empty set default value
    var currentValue = localStorage['FieldOne'];
    if (!currentValue || currentValue === null || currentValue == '') {
      var defaultValue = "Shown";
      localStorage['FieldOne'] = defaultValue;
    }
    //Function below requires click, so this just runs it once
    if (localStorage['FieldOne'] == "Shown") {
      $(".Lightbox-Content-Text textarea").css("display", "block");
    } else {
      $(".Lightbox-Content-Text textarea").css("display", "none");
    }

    $(".fa-wpforms").click(function() {
      if (localStorage['FieldOne'] == "Shown") {
        localStorage['FieldOne'] = 'Hidden';
        $(".Lightbox-Content-Text textarea").css("display", "none");
      } else {
        localStorage['FieldOne'] = 'Shown';
        $(".Lightbox-Content-Text textarea").css("display", "block");

        localStorage['FieldTwo'] = 'Hidden';
        $(".Teacher-Content-Main").css("display", "none");
      }
    });


    //Remembers folder condition, folded or open
    var currentValue = localStorage['FieldTwo'];
    if (!currentValue || currentValue === null || currentValue == '') {
      var defaultValue = "Hidden";
      localStorage['FieldTwo'] = defaultValue;
    }
    //Function below requires click, so this just runs it once
    if (localStorage['FieldTwo'] == "Shown") {
      $(".Teacher-Content-Main").css("display", "block");
    } else {
      $(".Teacher-Content-Main").css("display", "none");
    }

    $(".Teacher-Header").click(function() {
      if (localStorage['FieldTwo'] == "Shown") {
        localStorage['FieldTwo'] = 'Hidden';
        $(".Teacher-Content-Main").css("display", "none");
      } else {
        localStorage['FieldTwo'] = 'Shown';
        $(".Teacher-Content-Main").css("display", "block");

        localStorage['FieldOne'] = 'Hidden';
        $(".Lightbox-Content-Text textarea").css("display", "none");
      }
    });


    //Script for removing li element onClick
    $(".Teacher-List-Main").on("click", ".Teacher-List-Item a.Teacher-Li-Delete", function() {
      $(this).closest("li").remove();
    });


    //Editable Label
    $(function() {
      //Loop through all Labels with class 'editable'.
      $(".editable").each(function() {
        //Reference the Label.
        var label = $(this);

        //Add a TextBox next to the Label.
        label.after("<input type = 'text' class = 'Cal-Type-Input' style = 'display:none' />");

        //Reference the TextBox.
        var textbox = $(this).next();

        //Set the name attribute of the TextBox.
        textbox[0].name = this.id.replace("lbl", "txt");

        //Assign the value of Label to TextBox.
        textbox.val(label.html());

        //When Label is clicked, hide Label and show TextBox.
        label.click(function() {
          $(this).hide();
          $(this).next().show();
          $(".Cal-Type-Input").focus();
        });

        //When focus is lost from TextBox, hide TextBox and show Label.
        textbox.focusout(function() {
          $(this).hide();
          $(this).prev().html($(this).val());
          $(this).prev().show();
        });
      });
    });

    //Tooltip
    //Setting values
    $('.Lightbox-Content-Text label').attr('title', 'Details of the event');
    $('.Teacher-Header').attr('title', 'List of teacher/s attending');
    //Init tooltip
    $(function() {
      $('.Lightbox-Content-Text label').powerTip({
        placement: 'n'
      });
      $('.Teacher-Header').powerTip({
        placement: 'n'
      });
    });


    //On save button click
    $(".dhx_save_btn").click(function() {
      //Gets event values(OLD VALUES)
      var ev = scheduler.getEvent(scheduler.getState().lightbox_id);

      if (ev.type == "Lecture") {

        //Get values from input fields(NEW VALUES)
        var NewVgs = $('.dd-selected-value').attr("value");
        var NewColor = $('.Input-Color input').val();
        var NewMaxAva = $('.Input-AVA input').val();
        var NewDetails = $('.Lightbox-Content-Text textarea').val();
        var NewType = $(".Cal-Type").text();
        var NewTitle = $(".Lightbox-Header-Title").text();

        if (NewType !== "") {
          NewTypeVali = true;
        } else {
          NewTypeVali = false;
        }

        if (NewTitle !== "") {
          NewTitleVali = true;
        } else {
          NewTitleVali = false;
        }

        if (NewMaxAva !== "" && NewMaxAva !== "0" && NewMaxAva !== "00" && NewMaxAva !== "000" && NewMaxAva !== "0000") {
          NewMaxAvaVali = true;
        } else {
          NewMaxAvaVali = false;
        }

        if (NewMaxAva <= ev.ava) {
          NewMaxAvaVali = "Less";
        }

        var TeacherLength = $('ul.Teacher-List-Main li').length >= 1;

        if (TeacherLength == true) {

          var items = [];
          $(".Teacher-List-Main").find("li").each(function(i) {
            var li = $(this);
            var Id = li.find("input").val();
            items.push(Id);
          });

          var TeacherIdVar = items.join("§");
          //console.log(TeacherIdVar);
        } else if (TeacherLength == false) {
          //console.log("Teacher lenght is 0");
        }


        //Validation of fields
        if (NewVgs == "All" || NewVgs == "1" || NewVgs == "2" || NewVgs == "3") {
          var NewVgsVali = true;
        } else {
          var NewVgsVali = false;
        }
        //console.log(NewVgsVali);

        //NewVgsVali for vgs
        //TeacherLength for teacher list
        //NewTypeVali for type
        //NewMaxAvaVali for MaxAva

        if (NewVgsVali == false || TeacherLength == false || NewTypeVali == false || NewMaxAvaVali == false || NewMaxAvaVali == "Less" || NewTitleVali == false) {
          console.log("Validation failed");


          var ReturnFalse = [];



          if (NewVgsVali == false) {
            var Name = "VGS value must be \"All, 1, 2 or 3\"";
            ReturnFalse.push(Name);
          }
          if (TeacherLength == false) {
            var Name = "Select at least one teacher";
            ReturnFalse.push(Name);
          }
          if (NewTypeVali == false) {
            var Name = "You can not leave label above room number empty";
            ReturnFalse.push(Name);
          }
          if (NewMaxAvaVali == false) {
            var Name = "You can not leave max students filed empty, or have a higher than 4-digits";
            ReturnFalse.push(Name);
          }
          if (NewMaxAvaVali == "Less") {
            var Name = "There is currently " + ev.ava + " students enrolled in this event, max students can not be equal or less than that";
            ReturnFalse.push(Name);
          }
          if (NewTitleVali == false) {
            var Name = "Title can not be left empty";
            ReturnFalse.push(Name);
          }

          //For each false value, show PopUp_Message
          ReturnFalse.forEach(function(Item, i) {
            notify({
              //alert | success | error | warning | info
              type: "error",
              title: "Validation failed",

              //custom message
              message: Item,

              position: {

                //right | left | center
                x: "right",

                //top | bottom | center
                y: "bottom"
              },

              // notify icon
              icon: '<img src="img/PopUp_Message/error.png" />',

              overlay: false,
              closeBtn: true,
              overflowHide: false,
              spacing: 20,

              //default | dark-theme
              theme: "default",

              //auto-hide after a timeout
              autoHide: true,

              // timeout
              delay: 5000,

              // callback functions
              onShow: null,
              onClick: null,
              onHide: null,

              //custom template
              template: '<div class="notify"><div class="notify-text"></div></div>'
            });
          });




        } else {
          //Update data here
          if (ev.type == "Lecture") {
            ev.vgs = NewVgs;
            ev.color = NewColor;
            ev.maxava = NewMaxAva;
            ev.details = NewDetails;
            ev.sub = NewType;
            ev.title = NewTitle;
            if (TeacherLength == true) {
              ev.teacherid = TeacherIdVar;
            } else {
              ev.teacherid = "";
            }
          }

          //Ends or closes lightbox
          scheduler.endLightbox(true, document.getElementById(ev.id));

          notify({
            //alert | success | error | warning | info
            type: "success",
            title: ev.title + " Updated",

            //custom message
            message: "",

            position: {

              //right | left | center
              x: "right",

              //top | bottom | center
              y: "bottom"
            },

            // notify icon
            icon: '<img src="img/PopUp_Message/success.png" />',

            overlay: false,
            closeBtn: true,
            overflowHide: false,
            spacing: 20,

            //default | dark-theme
            theme: "default",

            //auto-hide after a timeout
            autoHide: true,

            // timeout
            delay: 3000,

            // callback functions
            onShow: null,
            onClick: null,
            onHide: null,

            //custom template
            template: '<div class="notify"><div class="notify-text"></div></div>'
          });
        }

      } else {

      }

    });

  });

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

} //End of init function


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
  if (event.type == "Test") {

    var TitleTest = "Title: " + event.title;
    var SubTest = "Type: " + event.sub;
    var DateTest = "Date: " + EventDay + " " + EventMonth + " " + EventYear;
    var TimeTest = "Time: " + EventTimeStart + " - " + EventTimeEnd;
    var VgsTest = "VGS: " + event.vgs;
    var AvaTest = "Ava: " + event.ava + " / " + event.maxava;

    return TitleTest + "<br>" + SubTest + "<br>" + TimeTest + "<br>" + VgsTest + "<br>" + AvaTest;

  } else if (event.type == "Lecture") {

    var TitleLec = "Title: " + event.title;
    var SubLec = "Sub: " + event.sub;
    var DateLec = "Date: " + EventDay + " " + EventMonth + " " + EventYear;
    var TimeLec = "Time: " + EventTimeStart + " - " + EventTimeEnd;
    var VgsLec = "VGS: " + event.vgs;
    var AvaLec = "Ava: " + event.ava + " / " + event.maxava;

    return TitleLec + "<br>" + SubLec + "<br>" + TimeLec + "<br>" + VgsLec + "<br>" + AvaLec;

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
