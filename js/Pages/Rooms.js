function init() {

  // Notification function (Title, TitleColor, Message, Icon, IconColor, Timeout)
  require("js/Functions/Notify.js");


  /* ---------------  --------------- */
  // START: Load room list //
  /* ---------------  --------------- */

  // Define variable to store roomlist
  var RoomList;

  // Fire off the request
  LoadRooms = $.ajax({
    url: "php/Single/LoadRooms.php",
    type: "get",
    dataType: "json",
    async: false,
    contentType: false, // The content type used when sending data to the server.
    cache: false, // To unable request pages to be cached
    processData: false // To send DOMDocument or non processed data file it is set to false
  });

  // Fired up on success
  LoadRooms.done(function(data) {

    if (data.Status == 'Failed') {
      Notify('Failed to load room list', 'yellow', data.Message, 'fa fa-warning', 'yellow', 5000);
    } else {
      RoomList = data;
    }

  })

  // Fired up on failure
  LoadRooms.fail(function(xhr, textStatus, errorThrown) {
    Notify('ERROR', 'red', 'Server error: ' + textStatus, 'fa fa-close', 'red');
  })


  /* ---------------  --------------- */
  // END: Load room list //
  /* ---------------  --------------- */


  /* ---------------  --------------- */
  // START: Add Room //
  /* ---------------  --------------- */


  $('#AddRoomButton').on('click', function(event) {
    $("#AddRoom").modal({
      fadeDuration: 250,
      fadeDelay: 0.50
    });
  });

  $('.AddRoom-Submit-Button').on('click', function(event) {
    $('form#AddRoomForm').submit();
  });



  // Define form data variable
  var RoomFormData = new FormData();

  // Variable to hold request
  var RoomRequest;

  // Bind to the submit event of our form
  $("#AddRoomForm").submit(function(event) {

    // Prevent default posting of form
    event.preventDefault();

    // Abort any pending request
    if (RoomRequest) {
      RoomRequest.abort();
    }


    /* ---------- START: Declaring field values ---------- */

    /*// Find fields and set(JSON Format)
    var RoomFormData = {
      Username: $('#Username').val(),
      Password: encodeURIComponent($('#Password').val())
    };*/

    // Get input value
    RoomFormData.append('Key', $('#Room-Input-Key').val());
    RoomFormData.append('Label', $('#Room-Input-Label').val());
    // Get select value
    RoomFormData.append('Parent_Room', $('#Room-Select').val());

    /* ---------- END: Declaring field values ---------- */



    // ----- START: Disabling input during form submit ----- //

    var $inputs = $(this).find("input, select, button, textarea");

    // Let's disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    // ----- END: Disabling input during form submit ----- //


    // ---------- START: Form submit ---------- //

    // Fire off the request
    RoomRequest = $.ajax({
      url: "php/Single/Add_Room.php",
      type: "post",
      data: RoomFormData,
      dataType: "json",
      async: false,
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false // To send DOMDocument or non processed data file it is set to false
    });

    // Fired up on success
    RoomRequest.done(function(data) {
      if (data.Status == 'Error') {
        Notify(data.Status, 'red', data.Message, 'fa fa-close', 'red');
      } else if (data.Status == 'Failed') {
        Notify(data.Status, 'yellow', data.Message, 'fa fa-warning', 'yellow', 4000);
      } else if (data.Status == 'Done') {

        // Make popup disappear
        $.modal.close();

        // Success Message
        Notify(data.Status, 'white', data.Message, 'fa fa-check', '#3FC380', 2000);

        var AccordionItem = '<li class="Accordion-Item"><a class="accordion-title">'+data.Key+'<span class="fa fa-trash Room-Delete" id="DeleteRoomButton" value="'+data.Room_Id+'"></span></a></li>';

        $('.accordion-title:contains("'+data.ParrentKey+'")').siblings().children('.accordion').append(AccordionItem);

        // Unset old data
        $('#Room-Input-Key').val('');
        $('#Room-Input-Label').val('');
        $('#Room-Select').val('');
        // Reload page, to load new data
        // location.reload();

      } else {
        Notify('Error', 'red', 'Response not recognized', 'fa fa-close', 'red');
      }
    })

    // Fired up on failure
    RoomRequest.fail(function(xhr, textStatus, errorThrown) {
      Notify('ERROR', 'red', 'Server error: ' + textStatus, 'fa fa-close', 'red');
    })

    // Fired up no matter if the result is a success or failure
    RoomRequest.always(function() {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    })

    // ---------- END: Form submit ---------- //

  });


  // Captalize first letter of input (username is not case sensitive, but password is)
  $('#Room-Input-Key, #Room-Input-Label').on('keydown', function(event) {
    if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
      var $t = $(this);
      event.preventDefault();
      var char = String.fromCharCode(event.keyCode);
      $t.val(char + $t.val().slice(this.selectionEnd));
      this.setSelectionRange(1, 1);
    }
  });

  // Prevent spaces and special character
  $('#Room-Input-Key').on('keypress', function(event) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  });

  // Prevent special character
  $('#Room-Input-Label').on('keypress', function(event) {
    var regex = new RegExp("^[a-zA-Z 0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  });


  /* ---------------  --------------- */
  // END: Add Room //
  /* ---------------  --------------- */


  /* ---------------  --------------- */
  // START: Delete Room //
  /* ---------------  --------------- */


  $(document).on("click", "span#DeleteRoomButton", function(e) {
    // Get value from javascript object
    function search(myArray, nameKey) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
          return myArray[i];
        }
      }
    }

    // Get data from element
    var Room_Id = search(e.target.attributes, "value").value;

    // Set data in pop-up element
    $('#DeleteRoom-Id').val(Room_Id);


    require("js/Functions/SearchObject.js");

    // Returns in array format but there should only be one, x[0] to get object values
    var x = getObjects(RoomList, 'id', Room_Id);

    $('#DelRoom-Key').text(x[0].key);

    // Show delete confirmation
    $("#DelRoom").modal({
      fadeDuration: 250,
      fadeDelay: 0.20
    });


    $(document).on("click", "a#DelRoom-Yes", function() {
      // Define form data variable
      var DelRoomFormData = new FormData();

      // Variable to hold request
      var DelRoomRequest;

      // Abort any pending request
      if (DelRoomRequest) {
        DelRoomRequest.abort();
      }


      // Get and prep value
      DelRoomFormData.append('Room_Id', $('#DeleteRoom-Id').val());


      // ---------- START: Post data ---------- //
      DelRoomRequest = $.ajax({
        url: "php/Single/Delete_Room.php",
        type: "post",
        data: DelRoomFormData,
        dataType: "json",
        async: false,
        contentType: false, // The content type used when sending data to the server.
        cache: false, // To unable request pages to be cached
        processData: false, // To send DOMDocument or non processed data file it is set to false
      });

      // Fired up on success
      DelRoomRequest.done(function(data) {
        if (data.Status == 'Failed') {
          Notify(data.Status, 'yellow', data.Message, 'fa fa-warning', 'yellow', 4000);
        } else if (data.Status == 'Done') {

          Notify(data.Status, 'white', 'Room <b>' + x[0].key + '</b> deleted', 'fa fa-trash', '#3FC380', 3000);

          $(e.target).parent().remove();

        } else {
          Notify('Error', 'red', 'Response not recognized', 'fa fa-close', 'red');
        }

        // Remove value from input before closeing
        $('#DeleteRoom-Id').val('');
        $.modal.close();
      })

      // Fired up on failure
      DelRoomRequest.fail(function(xhr, textStatus, errorThrown) {
        Notify('ERROR', 'red', 'Server error: ' + textStatus, 'fa fa-close', 'red');
      })
      // ---------- END: Post data ---------- //
    });


  });
  /* ---------------  --------------- */
  // END: Delete Room //
  /* ---------------  --------------- */


}
