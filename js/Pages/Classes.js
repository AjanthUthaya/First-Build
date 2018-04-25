// Include functions to display notifications
require("js/Functions/Notify.js");

function init() {

  // Captalize first letter of input
  $('#AddProgram-Program, #AddClass-Separator').on('keydown', function(event) {
    if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
      var $t = $(this);
      event.preventDefault();
      var char = String.fromCharCode(event.keyCode);
      $t.val(char + $t.val().slice(this.selectionEnd));
      this.setSelectionRange(1, 1);
    }
  });

  // Only allow letters
  $('#AddClass-Separator').keydown(function(e) {
    var regex = new RegExp("^[a-zA-Z\s\b]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  });


  // Hide table
  $('#List').hide();
  // Show loading
  $('#Loading-Table').show();

  // Init classes list
  $('#List').DataTable({
    // Showing x out of x.length
    "info": false,
    // Activate pagination
    "paging": true,
    // Order OnClcik of header
    "ordering": true,
    // Default orderdering (asc/desc)
    "order": [
      [2, 'asc'],
      [0, 'asc']
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
      // Show search
      $('#List-Search').show();
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
    url: "php/Single/Load_Programs.php",
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

    // Add top item, so the user can add new Program
    ProgramList.unshift({
      'value': 0,
      'text': '<span class="fa fa-plus-square AddNewIcon"></span><span class="AddNewLabel">Add new program</span>'
    });
  })

  // Fired up on failure
  Request.fail(function(xhr, textStatus, errorThrown) {
    NotifyError('Server error', textStatus + ' failed to load program list');
    ProgramList = [{
      'value': 0,
      'text': '<span class="fa fa-plus-close FailedListIcon"></span><span class="FailedListLabel">Failed to load program list...</span>'
    }];
  })

  // INIT DDSlick for program list
  $('#AddClass-Program').ddslick({
    data: ProgramList,
    selectText: 'Select Program',
    onSelected: function(data) {
      if (data.selectedIndex == 0) {
        LoadingFailed = $('#AddClass-Program .dd-option span').hasClass('FailedListIcon');
        if (LoadingFailed) {
          $("#AddClass-Program .dd-selected").text("Select Program");
        } else {
          $("#AddClass-Program .dd-selected").text("Select Program");
          $("#AddProgram").modal({
            fadeDuration: 250,
            fadeDelay: 0.20,
            closeExisting: false
          });
        }
      }

    }
  });

  LoadingFailed = $('#AddClass-Program .dd-option span').hasClass('FailedListIcon');

  if (LoadingFailed) {
    $('#AddClass-Program .dd-options li:first').addClass('FailedLoadingList');
  } else {
    // Add class to first item(+ Add new)
    $('#AddClass-Program .dd-options li:first').addClass('AddNew');
  }
  // ----------   ---------- //
  // END: PROGRAM LIST
  // ----------   ---------- //



  // ----------   ---------- //
  // START: YEAR LIST
  // ----------   ---------- //

  // Get Program list
  var YearList;

  // Fire off the request
  Request = $.ajax({
    url: "php/Single/Load_Years.php",
    type: "get",
    dataType: "json",
    async: false,
    contentType: false, // The content type used when sending data to the server.
    cache: false, // To unable request pages to be cached
    processData: false, // To send DOMDocument or non processed data file it is set to false
  });

  // Fired up on success
  Request.done(function(data) {
    YearList = data;

    // Add top item, so the user can add new Program
    YearList.unshift({
      'value': 0,
      'text': '<span class="fa fa-plus-square AddNewIcon"></span><span class="AddNewLabel">Add new year</span>'
    });
  })

  // Fired up on failure
  Request.fail(function(xhr, textStatus, errorThrown) {
    NotifyError('Server error', textStatus + ' failed to load year list');
    YearList = [{
      'value': 0,
      'text': '<span class="fa fa-plus-close FailedListIcon"></span><span class="FailedListLabel">Failed to load year list...</span>'
    }];
  })


  // INIT DDSlick for year list
  $('#AddClass-Year').ddslick({
    data: YearList,
    selectText: 'Select Year',
    onSelected: function(data) {

      if (data.selectedIndex == 0) {
        LoadingFailed = $('#AddClass-Year .dd-option span').hasClass('FailedListIcon');
        if (LoadingFailed) {
          $("#AddClass-Year .dd-selected").text("Select Year");
        } else {
          $("#AddClass-Year .dd-selected").text("Select Year");
          $("#AddYear").modal({
            fadeDuration: 250,
            fadeDelay: 0.20,
            closeExisting: false
          });
        }
      }

    }
  });

  LoadingFailed = $('#AddClass-Year .dd-option span').hasClass('FailedListIcon');

  if (LoadingFailed) {
    $('#AddClass-Year .dd-options li:first').addClass('FailedLoadingList');
  } else {
    // Add class to first item(+ Add new)
    $('#AddClass-Year .dd-options li:first').addClass('AddNew');
  }

  // ----------   ---------- //
  // END: YEAR LIST
  // ----------   ---------- //



  // ----------   ---------- //
  // START: ADD CLASS
  // ----------   ---------- //

  // Send data to php for processing
  // Define form data variable
  var FormDataAddClass = new FormData();

  // Variable to hold request
  var RequestAddClass;

  $(document).on('click', '#AddClass-Add', function(event) {

    // Abort any pending request
    if (RequestAddClass) {
      RequestAddClass.abort();
    }


    // ---------- START: Declaring field values ---------- //

    FormDataAddClass.append('Vgs', $('#AddClass-Vgs .dd-selected-value').val());
    FormDataAddClass.append('Separator', $('#AddClass-Separator').val());
    FormDataAddClass.append('Program', $('#AddClass-Program .dd-selected-value').val());
    FormDataAddClass.append('Year', $('#AddClass-Year .dd-selected-value').val());

    // ---------- END: Declaring field values ---------- //


    // ----- START: Disabling input during form submit ----- //

    var $inputs = $("#AddClassModal").find("input, select, button, textarea");

    // Let's disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    // ----- END: Disabling input during form submit ----- //


    // ---------- START: Form submit ---------- //

    // Fire off the request
    RequestAddClass = $.ajax({
      url: "php/Single/Add_Class.php",
      type: "post",
      data: FormDataAddClass,
      dataType: "json",
      async: false,
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
    });

    // Fired up on success
    RequestAddClass.done(function(data) {
      if (data.Status == 'Error') {
        NotifyError(data.Title, data.Message);
      } else if (data.Status == 'Failed') {
        NotifyFailed(data.Title, data.Message);
      } else if (data.Status == 'Done') {
        NotifyDone(data.Title, data.Message);

        setTimeout(function() {
          location.reload();
        }, 2500);

      } else {
        NotifyError('Response error', 'Response not recognized');
      }
    })

    // Fired up on failure
    RequestAddClass.fail(function(xhr, textStatus, errorThrown) {
      NotifyError('Server error', textStatus);
    })

    // Fired up no matter if the result is a success or failure
    RequestAddClass.always(function() {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    })

    // ---------- END: Form submit ---------- //

  });

  // ----------   ---------- //
  // END: ADD CLASS
  // ----------   ---------- //



  // ----------   ---------- //
  // START: ADD PROGRAM
  // ----------   ---------- //

  // Send data to php for processing
  // Define form data variable
  var FormDataAddProgram = new FormData();

  // Variable to hold request
  var RequestAddProgram;

  $(document).on('click', '#AddProgram-Add', function(event) {

    // Abort any pending request
    if (RequestAddProgram) {
      RequestAddProgram.abort();
    }


    // ---------- START: Declaring field values ---------- //

    FormDataAddProgram.append('Program', $('#AddProgram-Program').val());
    FormDataAddProgram.append('Code', $('#AddProgram-Code').val());

    // ---------- END: Declaring field values ---------- //


    // ----- START: Disabling input during form submit ----- //

    var $inputs = $("#AddProgram").find("input, select, button, textarea");

    // Let's disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    // ----- END: Disabling input during form submit ----- //


    // ---------- START: Form submit ---------- //

    // Fire off the request
    Request = $.ajax({
      url: "php/Single/Add_Program.php",
      type: "post",
      data: FormDataAddProgram,
      dataType: "json",
      async: false,
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
    });

    // Fired up on success
    Request.done(function(data) {

      if (data.Status == 'Error') {
        NotifyError(data.Title, data.Message);
      } else if (data.Status == 'Failed') {
        NotifyFailed(data.Title, data.Message);
      } else if (data.Status == 'Done') {
        NotifyDone(data.Title, data.Message);

        // Destroy DDSlick
        $('#AddClass-Program').ddslick('destroy');

        // Add the new program to array
        ProgramList.push({
          'value': data.Id,
          'text': data.Program + ' (' + data.Code + ')'
        });

        // INIT DDSlick for program list
        $('#AddClass-Program').ddslick({
          data: ProgramList,
          selectText: 'Select Program',
          onSelected: function(data) {

            if (data.selectedIndex == 0) {
              LoadingFailed = $('#AddClass-Program .dd-option span').hasClass('FailedListIcon');
              if (LoadingFailed) {
                $("#AddClass-Program .dd-selected").text("Select Program");
              } else {
                $("#AddClass-Program .dd-selected").text("Select Program");
                $("#AddProgram").modal({
                  fadeDuration: 250,
                  fadeDelay: 0.20,
                  closeExisting: false
                });
              }
            }

          }
        });

        // Add class to first item(+ Add new)
        $('#AddClass-Program .dd-options li:first').addClass('AddNew');

        // Close add program modal
        $('#AddProgram').modal('close');

        // Open add class again
        setTimeout(function() {
          $("#AddClassModal").modal({});
        }, 300);


      } else {
        NotifyError('Response error', 'Response not recognized');
      }


    })

    // Fired up on failure
    Request.fail(function(xhr, textStatus, errorThrown) {
      NotifyError('Server error', textStatus);
    })

    // Fired up no matter if the result is a success or failure
    Request.always(function() {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    })

    // ---------- END: Form submit ---------- //

  });

  // ----------   ---------- //
  // END: ADD PROGRAM
  // ----------   ---------- //



  // ----------   ---------- //
  // START: ADD YEAR
  // ----------   ---------- //

  // Send data to php for processing
  // Define form data variable
  var FormDataAddYear = new FormData();

  // Variable to hold request
  var RequestAddYear;

  $(document).on('click', '#AddYear-Add', function(event) {

    // Abort any pending request
    if (RequestAddYear) {
      RequestAddYear.abort();
    }


    // ---------- START: Declaring field values ---------- //

    FormDataAddYear.append('Title', $('#AddYear-Title').val());
    FormDataAddYear.append('Start_Date', $('#AddYear-Start_Date').val());
    FormDataAddYear.append('End_Date', $('#AddYear-End_Date').val());

    // ---------- END: Declaring field values ---------- //


    // ----- START: Disabling input during form submit ----- //

    var $inputs = $("#AddYear").find("input, select, button, textarea");

    // Let's disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    // ----- END: Disabling input during form submit ----- //


    // ---------- START: Form submit ---------- //

    // Fire off the request
    Request = $.ajax({
      url: "php/Single/Add_Year.php",
      type: "post",
      data: FormDataAddYear,
      dataType: "json",
      async: false,
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
    });

    // Fired up on success
    Request.done(function(data) {
      if (data.Status == 'Error') {
        NotifyError(data.Title, data.Message);
      } else if (data.Status == 'Failed') {
        NotifyFailed(data.Title, data.Message);
      } else if (data.Status == 'Done') {
        NotifyDone(data.Title, data.Message);

        // Destroy DDSlick
        $('#AddClass-Year').ddslick('destroy');

        // Add the new program to array
        YearList.push({
          'value': data.Id,
          'text': data.Title
        });

        // INIT DDSlick for program list
        $('#AddClass-Year').ddslick({
          data: YearList,
          selectText: 'Select Year',
          onSelected: function(data) {

            if (data.selectedIndex == 0) {
              LoadingFailed = $('#AddClass-Year .dd-option span').hasClass('FailedListIcon');
              if (LoadingFailed) {
                $("#AddClass-Program .dd-selected").text("Select Year");
              } else {
                $("#AddClass-Year .dd-selected").text("Select Year");
                $("#AddYear").modal({
                  fadeDuration: 250,
                  fadeDelay: 0.20,
                  closeExisting: false
                });
              }
            }

          }
        });

        // Add class to first item(+ Add new)
        $('#AddClass-Year .dd-options li:first').addClass('AddNew');

        // Close add program modal
        $('#AddYear').modal('close');

        // Open add class again
        setTimeout(function() {
          $("#AddClassModal").modal({});
        }, 300);


      } else {
        NotifyError('Response error', 'Response not recognized');
      }
    })

    // Fired up on failure
    Request.fail(function(xhr, textStatus, errorThrown) {
      NotifyError('Server error', textStatus);
    })

    // Fired up no matter if the result is a success or failure
    Request.always(function() {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    })

    // ---------- END: Form submit ---------- //

  });

  // ----------   ---------- //
  // END: ADD YEAR
  // ----------   ---------- //



  // ----------   ---------- //
  // START: Delete function
  // Might just drop delete TESTING
  // ----------   ---------- //

  function ConfirmDelete(Type, Title, Message, Id) {

    if (Id !== '') {
      // ID
      $('#Delete-Id').val(Id);
    }

    // Title
    $('#Delete-Title').html(Title);

    // Message
    $('#Delete-Message').html(Message);

    $('#Delete').addClass(Type);

    $("#Delete").modal({
      fadeDuration: 250,
      fadeDelay: 0.20
    });

  }

  // ----------   ---------- //
  // END: Delete function
  // ----------   ---------- //



  // ----------   ---------- //
  // START: Load all users
  // ----------   ---------- //

  // Declare array to store users from DB
  var UsersArray = new Array();


  // ---------- START: Ajax request ---------- //

  // Fire off the request
  Request = $.ajax({
    url: "php/Single/Load_Users.php",
    type: "get",
    dataType: "json",
    async: false,
    contentType: false, // The content type used when sending data to the server.
    cache: false, // To unable request pages to be cached
    processData: false, // To send DOMDocument or non processed data file it is set to false
  });

  // Fired up on success
  Request.done(function(data) {

    // Store results
    UsersArray = data.data;
    // console.log(UsersArray); // TESTING

    if (data.Status == 'Error') {
      NotifyError(data.Title, data.Message);
    } else if (data.Status == 'Failed') {
      NotifyFailed(data.Title, data.Message);
    } else if (data.Status == 'Done') {



    } else {
      NotifyError('Response error', 'Response not recognized');
    }

  });

  // Fired up on failure
  Request.fail(function(xhr, textStatus, errorThrown) {
    NotifyError('Server error', textStatus);
  });

  // ---------- END: Ajax request ---------- //


  // ----------   ---------- //
  // END: Load all users
  // ----------   ---------- //



  // ----------   ---------- //
  // START: Manage class load data
  // ----------   ---------- //

  // OnClick of list item
  $('#List tbody').on('click', 'tr', function() {

    // Empty user list from before
    $('.ManageClass-List-Main').empty();


    // Define table
    var table = $('#List').DataTable();
    // Get data from item (column)
    var data = table.row(this).data();
    // Get id from item
    var Class_Id = $(this).data('id');

    // Set id for modal
    $('#ManageClass-Id').val(Class_Id);

    // console.log(Class_Id); // TESTING

    // ----------   ---------- //
    // START: Load all selected users from DB + Class details
    // ----------   ---------- //

    // Define form data variable
    var Class_Id_Form = new FormData();

    Class_Id_Form.append('Class_Id', Class_Id);

    // Declare array to store users from DB
    var UsersSelectedDB = new Array();

    // ---------- START: Ajax request ---------- //

    // Fire off the request
    Request = $.ajax({
      url: "php/Single/Load_Users_Selected.php",
      type: "post",
      data: Class_Id_Form,
      dataType: "json",
      async: false,
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
    });

    // Fired up on success
    Request.done(function(data) {

      // Store results
      UsersSelectedDB = data;
      console.log(UsersSelectedDB); // TESTING

      // ----------   ---------- //
      // START: Set class details

      $('.Title-Program').html(data.Program);

      $('.Title-CodeYear').html(data.Code + ' - ' + data.Year);

      // END: Set class details
      // ----------   ---------- //

    });

    // Fired up on failure
    Request.fail(function(xhr, textStatus, errorThrown) {
      NotifyError('Server error', textStatus);
    });

    // ---------- END: Ajax request ---------- //

    // ----------   ---------- //
    // END: Load all selected users from DB + Class details
    // ----------   ---------- //



    // ----------   ---------- //
    // START: Append all users in array
    // ----------   ---------- //

    // Check if array is empty
    if (UsersArray == undefined) {

      // Append fallback if no users are found
      $('.ManageClass-List-Main').append('<li id="ManageClass_No_Users">No users found</li>');

    } else {

      $.each(UsersArray, function(index, data) {


        // ----------   ---------- //
        // START: Define html template for item

        var UserTemplate = {};

        // Img section
        UserTemplate.ImgStart = '<div class="List-Item-Img">';
        UserTemplate.ImgContent = '<img src="' + 'img/Profile/Thumbnail/' + data.Img_Name + '">';
        UserTemplate.ImgEnd = '</div>';

        UserTemplate.Img = UserTemplate.ImgStart + UserTemplate.ImgContent + UserTemplate.ImgEnd;


        // Content Section
        UserTemplate.ContentStart = '<div class="List-Item-Content">';
        if (data.Middlename == 'NULL') {
          UserTemplate.ContentContent = '<div class="Item-Content-Name"><span id="Item-Content-Name">' + data.Firstname + ' ' + data.Lastname + '</span></div>';
        } else {
          UserTemplate.ContentContent = '<div class="Item-Content-Name"><span id="Item-Content-Name">' + data.Firstname + ' ' + data.Middlename + ' ' + data.Lastname + '</span></div>';
        }
        UserTemplate.ContentEnd = '</div>';

        UserTemplate.Content = UserTemplate.ContentStart + UserTemplate.ContentContent + UserTemplate.ContentEnd;


        // Checkbox section
        UserTemplate.CheckboxStart = '<div class="List-Item-Checkbox">';
        UserTemplate.CheckboxContent = '<label class="container"><input type="checkbox"><span class="checkmark"></span></label>';
        UserTemplate.CheckboxEnd = '</div>';

        UserTemplate.Checkbox = UserTemplate.CheckboxStart + UserTemplate.CheckboxContent + UserTemplate.CheckboxEnd;


        // Full item
        UserTemplate.Full = '<li class="List-Item" data-id="' + data.Id + '">' + UserTemplate.Img + UserTemplate.Content + UserTemplate.Checkbox + '</li>';

        // END: Define html template for item
        // ----------   ---------- //


        $(".ManageClass-List-Main").append(UserTemplate.Full);

      });

    }

    // ----------   ---------- //
    // END: Append all users in array
    // ----------   ---------- //


    // ----------   ---------- //
    // START: Load selected items from DB


    // Define array selected items from DB
    var UsersSelectedDB;

    // Check if there is any users
    if (UsersArray !== undefined) {

      UsersSelectedDB = [{
        "Id": 11
      }, {
        "Id": 10
      }, {
        "Id": 5
      }];

    }


    // END: Manage class load data
    // ----------   ---------- //


    $(".ManageClass-List-Main > li").each(function() {

      // Item
      var Item = $(this);
      // Get id of item
      var Item_Id = $(this).data('id');

      var Id_Exists = false;

      // Loop thourgh UsersSelectedDB
      $.each(UsersSelectedDB, function(index, data) {
        if (Item_Id == data.Id) {
          Id_Exists = true;
        }
      });

      // Check if id exsists in UsersSelectedDB
      if (Id_Exists) {
        Item.find("input").prop("checked", true);
      } else {
        Item.find("input").prop("checked", false);
      }

    });


    // console.log(Class_Id); // TESTING

    // Show modal
    $("#ManageClass").modal({
      fadeDuration: 250,
      fadeDelay: 0.50
    });



    // ----------   ---------- //
    // START: Save all checked
    // ----------   ---------- //

    $('#ManageClass-Save').on('click', function(event) {

      // Declare array to store all selected users
      var UsersSelected = [];

      // Loop through all items and check if checkbox is checked
      $('.ManageClass-List-Main  input:checked').each(function() {
        UsersSelected.push({
          id: $(this).closest('li').data('id')
        });
      });

      // TESTING
      console.log(UsersSelected);

    });

    // ----------   ---------- //
    // END: Save all checked
    // ----------   ---------- //



  });

  // ----------   ---------- //
  // END: Manage class load data
  // ----------   ---------- //



  // ----------   ---------- //
  // START: Search filter
  // ----------   ---------- //

  if (UsersArray !== undefined) {

    // Init once, because the filter requires an input to run
    var UsersFilteredArray = $.grep(UsersArray, function(data, index) {
      return true;
    });

  }


  $('#Filter-Search').on('keyup', function(event) {

    // User input
    var SearchInput = $('#Filter-Search').val();


    // ----------   ---------- //
    // START: Loop through array to check if item matches filter paramaters

    var UsersFilteredArray = $.grep(UsersArray, function(data, index) {


      // Define and set variable for storing if all paramaters match
      var MatchesParam = true;

      // Defining conditions for if statements (Firstname, Middlename or lastname)
      var CheckFirstname = data.Firstname.toLowerCase().indexOf(SearchInput.toLowerCase()) == -1;
      var CheckMiddlename = data.Middlename.toLowerCase().indexOf(SearchInput.toLowerCase()) == -1;
      var CheckLastname = data.Lastname.toLowerCase().indexOf(SearchInput.toLowerCase()) == -1;



      // ----------   ---------- //
      // START: Check if name matches user input
      // ----------   ---------- //

      // Check if middlename is NULL
      if (data.Middlename == 'NULL') {

        // Check if firstname or lastname matches user input
        if (CheckFirstname && CheckLastname) {
          MatchesParam = false;
        }

      } else {

        // Check if firstname, middlename, or lastname matches user input
        if (CheckFirstname && CheckMiddlename && CheckLastname) {
          MatchesParam = false;
        }

      }

      // ----------   ---------- //
      // START: Check if name matches user input
      // ----------   ---------- //



      // ----------   ---------- //
      // START: Matches all paramaters
      // ----------   ---------- //

      if (MatchesParam) {
        return true;
      } else {
        return false;
      }

      // ----------   ---------- //
      // END: Matches all paramaters
      // ----------   ---------- //



    });

    // END: Loop through array to check if item matches filter paramaters
    // ----------   ---------- //



    // ----------   ---------- //
    // START: Get all items inside ul and check if id matches id from UsersFilteredArray
    // ----------   ---------- //

    $(".ManageClass-List-Main > li").each(function() {

      // Item
      var Item = $(this);
      // Get id of item
      var Item_Id = $(this).data('id');

      var Id_Exists = false;

      // Loop thourgh UsersFilteredArray
      $.each(UsersFilteredArray, function(index, data) {
        if (Item_Id == data.Id) {
          Id_Exists = true;
        }
      });

      // Check if id exsists in UsersFilteredArray
      if (Id_Exists) {
        Item.css('display', 'flex');
      } else {
        Item.css('display', 'none');
      }

    });

    // ----------   ---------- //
    // END: Get all items inside ul and check if id matches id from UsersFilteredArray
    // ----------   ---------- //



  });

  // ----------   ---------- //
  // END: Search filter
  // ----------   ---------- //



}
