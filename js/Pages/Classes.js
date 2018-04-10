function init() {

  // Notification function (Title, TitleColor, Message, Icon, IconColor, Timeout)
  require("js/Functions/Notify.js");

  // Hide table
  $('#List').hide();
  // Show loading
  $('#Loading-Table').show();


  $('#List').DataTable({
    // Showing x out of x.length
    "info": false,
    // Activate pagination
    "paging": true,
    // Order OnClcik of header
    "ordering": true,
    // Default orderdering (asc/desc)
    "order": [
      [0],
      [1, 'desc']
    ],
    // Activate search bar
    "searching": true,
    // Disable ability to change page length
    "lengthChange": false,
    // Array of options to limit paging
    "lengthMenu": [10, 25, 50, 75, 100],
    // Set default paging limit
    "pageLength": 20,
    // Set size based on data
    "autoWidth": true,
    "initComplete": function(settings, json) {
      // Hide loading
      $('#Loading-Table').hide();
      // Show table after loading
      $('#List').show();
    }
  });

  // Enables search bar to filter content
  oTable = $('#List').DataTable();
  $('#List-Search').keyup(function() {
    oTable.search($(this).val()).draw();
  })

  // Open Add Class OnClick (jQueryModal)

  $('#Add-Class').on('click', function(event) {
    $("#AddClassModal").modal({
      fadeDuration: 250,
      fadeDelay: 0.50
    });
  });


  // ----------   ---------- //
  // START: VGS LIST
  // ----------   ---------- //

  // VGS data
  var Vgs = [{
      text: "1",
      value: 1,
    },
    {
      text: "2",
      value: 2,
    },
    {
      text: "3",
      value: 3,
    }
  ];

  // INIT DDSlick for vgs list
  $('#AddClass-Vgs').ddslick({
    data: Vgs,
    selectText: 'Select VGS'
  });

  // ----------   ---------- //
  // END: VGS LIST
  // ----------   ---------- //


  // ----------   ---------- //
  // START: PROGRAM LIST
  // ----------   ---------- //

  // Get Program list
  var ProgramList;

  // Fire off the request
  Request = $.ajax({
    url: "php/Single/LoadPrograms.php",
    type: "get",
    dataType: "json",
    async: false,
    contentType: false, // The content type used when sending data to the server.
    cache: false, // To unable request pages to be cached
    processData: false, // To send DOMDocument or non processed data file it is set to false
  });

  // Fired up on success
  Request.done(function(data) {
    ProgramList = data;
    console.log(data);
  })

  // Fired up on failure
  Request.fail(function(xhr, textStatus, errorThrown) {
    Notify('ERROR', 'red', 'Server error: ' + textStatus, 'fa fa-close', 'red');
    // NOTE: If loading list failed, add error item here
  })

  // Add top item, so the user can add new Program
  ProgramList.unshift({
    'value': 0,
    'text': 'Add new'
  });

  // INIT DDSlick for program list
  $('#AddClass-Program').ddslick({
    data: ProgramList,
    selectText: 'Select Program'
  });
  // ----------   ---------- //
  // START: PROGRAM LIST
  // ----------   ---------- //


  // ----------   ---------- //
  // START: YEAR LIST
  // ----------   ---------- //

  // Get Year list


  // INIT DDSlick for year list
  $('#AddClass-Year').ddslick({
    data: Vgs,
    selectText: 'Select Year'
  });

  // ----------   ---------- //
  // END: YEAR LIST
  // ----------   ---------- //

}
