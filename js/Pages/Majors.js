function init() {

  // Toggle search bar
  $('.Major-Title-Left').on('click', function(event) {
    // Show search bar
    $('.Major-Search-Main').toggleClass('Major-Search-Show');

    // Focus on input
    $("#Search-Major").focus();

  });

  // Runs search engine
  $("#Search-Major").on("keyup", function(event) {
    // Filters items on input
    var value = $(this).val().toLowerCase();
    $(".Major-List .Major-Item").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });


  // On Item click
  $(".Major-Item").on("click", function(e) {
    var Major_Id = $(e.target).data('major_id');

    // console.log(Major_Id); // TESTING
  });

  $("#AddMajor").on("click", function(e) {
    $("#AddMajor-Modal").modal({
      fadeDuration: 250,
      fadeDelay: 0.50
    });
  });

  // Captalize first letter of Major name
  $(document).on("keydown", "#AddMajor-Major", function(e) {
    if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
      var $t = $(this);
      event.preventDefault();
      var char = String.fromCharCode(event.keyCode);
      $t.val(char + $t.val().slice(this.selectionEnd));
      this.setSelectionRange(1, 1);
    }
  });


  // On add major, send form
  $(document).on("click", "#AddMajor-Confirm", function(e) {
    $('form#AddMajorForm').submit();
  });

  // Notification function (Title, TitleColor, Message, Icon, IconColor, Timeout)
  require("js/Functions/Notify.js");

  // Define form data variable
  var FormDataAddMajor = new FormData();

  // Variable to hold request
  var RequestAddMajor;

  // Bind to the submit event of our form
  $("#AddMajorForm").submit(function(event) {

    // Prevent default posting of form
    event.preventDefault();

    // Abort any pending request
    if (RequestAddMajor) {
      RequestAddMajor.abort();
    }


    /* ---------- START: Declaring field values ---------- */

    FormDataAddMajor.append('Major', $('#AddMajor-Major').val());
    FormDataAddMajor.append('Code', $('#AddMajor-Code').val());
    FormDataAddMajor.append('Vgs', $('#AddMajor-Vgs').val());
    FormDataAddMajor.append('Color', $('#AddMajor-Color').val());
    FormDataAddMajor.append('Hours', $('#AddMajor-Hours').val());

    /* ---------- END: Declaring field values ---------- */



    // ----- START: Disabling input during form submit ----- //

    var $inputs = $(this).find("input, select, button, textarea");

    // Let's disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    // ----- END: Disabling input during form submit ----- //


    // ---------- START: Form submit ---------- //

    // Fire off the request
    RequestAddMajor = $.ajax({
      url: "/php/Single/Add_Major.php",
      type: "post",
      data: FormDataAddMajor,
      dataType: "json",
      async: false,
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
    });

    // Fired up on success
    RequestAddMajor.done(function(data) {
      if (data.Status == 'Error') {
        Notify(data.Status, 'red', data.Message, 'fa fa-close', 'red');
      } else if (data.Status == 'Failed') {
        Notify(data.Status, 'yellow', data.Message, 'fa fa-warning', 'yellow', 5000);
      } else if (data.Status == 'Done') {

        // Make popup disappear
        $.modal.close();

        // Append item to major list
        var Major_Item = '<div class="Major-Item" style="background: ' + data.Color + ';"><div class="Major-Item-Container"><a class="Major-Item-Title" href="EditMajor.php?Major_Id=' + data.Major_Id + '" data-major_id="' + data.Major_Id + '">' + data.Major + ' (' + data.Code + ')</a></div></div>';
        $('.Major-List').append(Major_Item);

        // Show success message
        Notify('Major added', 'white', data.Message, 'fa fa-check', '#3FC380', 3000);

      } else {
        Notify('Error', 'red', 'Response not recognized', 'fa fa-close', 'red');
      }
    })

    // Fired up on failure
    RequestAddMajor.fail(function(xhr, textStatus, errorThrown) {
      Notify('ERROR', 'red', 'Server error: ' + textStatus, 'fa fa-close', 'red');
    })

    // Fired up no matter if the result is a success or failure
    RequestAddMajor.always(function() {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    })

    // ---------- END: Form submit ---------- //

  });

  // Change color of add major header
  $('#AddMajor-Color').change(function() {
    $('.AddMajor-Header').css('background-color', $(this).val());
  });


}
