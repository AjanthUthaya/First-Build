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
   // START: Function to load/append all users
   // ----------   ---------- //
   var User_Count;

   function LoadUsers(UsersArray) {

      // Check if array is empty
      if (UsersArray == undefined) {

         $(".ManageClass-List-Main").empty();

         // Append fallback if no users are found
         $('.ManageClass-List-Main').append('<li id="ManageClass_No_Users">No users found</li>');

      } else {

         $(".ManageClass-List-Main").empty();

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

         User_Count = UsersArray.length;

      }

   }

   // ----------   ---------- //
   // END: Function to load/append all users
   // ----------   ---------- //

   var LoadSelectedUsers;

   // ----------   ---------- //
   // START: Manage class load data
   // ----------   ---------- //

   // OnClick of list item
   $('#List tbody').on('click', 'tr', function() {

      // INIT Foundation accordion
      $('.ManageClass-Filter-Main').foundation();

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
      var UsersSelectedDB_Results = new Array();

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

         if (data.Status == 'Error') {
            NotifyError(data.Title, data.Message);
         } else if (data.Status == 'Failed') {
            NotifyFailed(data.Title, data.Message);
         } else if (data.Status == 'Done') {

            // Store results
            UsersSelectedDB_Results = data.data;
            // console.log(data); // TESTING

            // ----------   ---------- //
            // START: Set class details

            $('.Title-Program').html(data.Program);

            $('.Title-CodeYear').html(data.Code + ' - ' + data.Year);

            // END: Set class details
            // ----------   ---------- //

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
      // END: Load all selected users from DB + Class details
      // ----------   ---------- //


      // ----------   ---------- //
      // START: Load all selected users from db
      // ----------   ---------- //
      LoadSelectedUsers = function LoadSelectedUsers() {
         // Define array selected items from DB
         var UsersSelectedDB;

         // Check if there is any users
         if (UsersArray !== undefined) {

            UsersSelectedDB = UsersSelectedDB_Results;

         }


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

         $('#User_Count').empty();
         $('#User_Count').append(UsersSelectedDB.length + ' out of ' + User_Count + ' selected');

      }

      // ----------   ---------- //
      // END: Load all selected users from db
      // ----------   ---------- //



      var element = $('#General-Order');

      if (element.text() == 'ASC') {

         // Only sorts firstname - ASC
         SortUsersArray = UsersArray.sort(function(a, b) {
            var x = a.Firstname,
               y = b.Firstname;
            return x < y ? -1 : x > y ? 1 : 0;
         });

      } else {

         // Only sorts firstname - DESC
         SortUsersArray = UsersArray.sort(function(a, b) {
            var x = a.Firstname,
               y = b.Firstname;
            return x < y ? 1 : x > y ? -1 : 0;
         });

      }

      LoadUsers(SortUsersArray);
      LoadSelectedUsers();


      // Show ManageClass modal
      $("#ManageClass").modal({
         fadeDuration: 250,
         fadeDelay: 0.50
      });



      // ----------   ---------- //
      // START: Save all checked
      // ----------   ---------- //

      $('#ManageClass-Save').unbind().on('click', function(event) {

         // Declare array to store all selected users
         var UsersSelected = [];

         // Loop through all items and check if checkbox is checked
         $('.ManageClass-List-Main  input:checked').each(function() {
            data = $(this).closest('li').data('id');
            UsersSelected.push({
               data
            });
         });



         // ----------   ---------- //
         // START: POST selected for processing
         // ----------   ---------- //

         // Define form data variable
         var UsersSelected_FormData = new FormData();

         /* ---------- START: Declaring field values ---------- */


         UsersSelected_FormData.append('Class_Id', $('#ManageClass-Id').val());
         UsersSelected_FormData.append('UsersSelected', JSON.stringify(UsersSelected));

         /* ---------- END: Declaring field values ---------- */


         // ----- START: Disabling input during form submit ----- //

         var $inputs = $('#ManageClass').find("input, select, button, textarea, a");

         // Disable buttons and inputs on form submit
         $inputs.prop("disabled", true);

         // ----- END: Disabling input during form submit ----- //



         // ---------- START: Ajax request ---------- //

         // Fire off the request
         Request = $.ajax({
            url: "php/Single/Save_Users_Selected.php",
            type: "post",
            data: UsersSelected_FormData,
            dataType: "json",
            async: false,
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable request pages to be cached
            processData: false // To send DOMDocument or non processed data file it is set to false
         });

         // Fired up on success
         Request.done(function(data) {
            if (data.Status == 'Error') {
               NotifyError(data.Title, data.Message);
            } else if (data.Status == 'Failed') {
               NotifyFailed(data.Title, data.Message);
            } else if (data.Status == 'Done') {

               // Close ManageClass modal
               $('#ManageClass').modal('close');

               NotifyDone(data.Title, data.Message);

            } else {
               NotifyError('Response error', 'Response not recognized');
            }
         });

         // Fired up on failure
         Request.fail(function(xhr, textStatus, errorThrown) {
            NotifyError('Server error', textStatus);
         });

         // Fired up no matter if the result is a success or failure
         Request.always(function() {
            // Reenable the inputs
            $inputs.prop("disabled", false);
         });

         // ---------- END: Ajax request ---------- //



         // ----------   ---------- //
         // END: POST selected for processing
         // ----------   ---------- //



      });

      // ----------   ---------- //
      // END: Save all checked
      // ----------   ---------- //



   });

   // ----------   ---------- //
   // END: Manage class load data
   // ----------   ---------- //



   /* Add checkmark for box on selection of user_type */
   $('.Filter-Checkbox input[type="checkbox"]').on('click', function(e) {

      var SpanBox = $(e.target).closest('.Filter-Checkbox').find('.Filter-Checkbox-Box');

      if ($(this).is(':checked')) {
         SpanBox.addClass('fa fa-check');
      } else {
         SpanBox.removeClass('fa fa-check');
      }

   });



   // ----------   ---------- //
   // START: Search filter
   // ----------   ---------- //

   function FilterData() {

      // Change sort between ASC/DESC
      var element = $('#General-Order');

      $(element).on('click', (e) => {
         if (element.text() == 'ASC') {
            element.html('DESC');
         } else {
            element.html('ASC');
         }
      });




      if (UsersArray !== undefined) {

         // Init once, because the filter requires an input to run
         var UsersFilteredArray = $.grep(UsersArray, function(data, index) {
            return true;
         });

      }


      $('#Filter-Search, #General-Order, #General-SelectedOnly, #User_Type-Admin, #User_Type-Teacher, #User_Type-Student').on('keyup click', function(event) {

         console.log('Filter init');

         $(".ManageClass-List-Main").empty();

         // User input
         var SearchInput = $('#Filter-Search').val();


         // ----------   ---------- //
         // START: Loop through array to check if item matches filter paramaters

         var UsersFilteredArray = $.grep(UsersArray, function(data, index) {


            // Define and set variable for storing if all paramaters match
            var MatchesParam = true;



            // ----------   ---------- //
            // START: Check if name matches user input
            // ----------   ---------- //

            // Define SearchInput inside a new Regex
            var Regex = new RegExp(SearchInput);

            // Check if middlename is NULL
            if (data.Middlename == 'NULL') {

               // Define name
               var FullName = data.Firstname.toLowerCase() + ' ' + data.Lastname.toLowerCase();

               var TestInput = Regex.test(FullName);

               // Check if firstname or lastname matches user input
               if (!TestInput) {
                  MatchesParam = false;
               }

            } else {

               // Define name
               var FullName = data.Firstname.toLowerCase() + ' ' + data.Middlename.toLowerCase() + ' ' + data.Lastname.toLowerCase();

               var TestInput = Regex.test(FullName);

               // Check if firstname, middlename, or lastname matches user input
               if (!TestInput) {
                  MatchesParam = false;
               }

            }

            // ----------   ---------- //
            // START: User type filter
            // ----------   ---------- //



            // ----------   ---------- //
            // END: User type filter
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
         // START: Filter after ASC/DESC

         var element = $('#General-Order');

         if (element.text() == 'ASC') {

            // Only sorts firstname - ASC
            SortUsersArray = UsersArray.sort(function(a, b) {
               var x = a.Firstname,
                  y = b.Firstname;
               return x < y ? -1 : x > y ? 1 : 0;
            });

         } else {

            // Only sorts firstname - DESC
            SortUsersArray = UsersArray.sort(function(a, b) {
               var x = a.Firstname,
                  y = b.Firstname;
               return x < y ? 1 : x > y ? -1 : 0;
            });

         }

         LoadUsers(SortUsersArray);
         LoadSelectedUsers();

         // END: Filter after ASC/DESC
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


         // Set the amount of students that are selected
         $('#User_Count').empty();
         $('#User_Count').append(' out of ' + User_Count + ' selected');

      });

   }

   FilterData();

   // ----------   ---------- //
   // END: Search filter
   // ----------   ---------- //

   // ----------   ---------- //
   // START: Select items per page
   // ----------   ---------- //

   // Limit items per page
   var Limit_Data = [{
         text: "10",
         value: 10
      },
      {
         text: "20",
         value: 20
      },
      {
         text: "30",
         value: 30,
         selected: true
      },
      {
         text: "40",
         value: 40
      },
      {
         text: "50",
         value: 50
      }
   ];

   // INIT DDSlick for vgs list
   $('#General-Limit').ddslick({
      data: Limit_Data
   });

   // ----------   ---------- //
   // END: Select items per page
   // ----------   ---------- //


   // ----------   ---------- //
   // START: Clear filter options
   // ----------   ---------- //

   function ClearFilter() {
      console.log('clicked');

      // Clear out search input
      $('#Filter-Search').val('');

      // Change sort to default (ASC)
      $('#General-Order').html('ASC');

      // Uncheck, only show checked
      $('#General-SelectedOnly').prop('checked', false);

      // Uncheck all user_type checkboxes
      $('#User_Type-Admin, #User_Type-Teacher, #User_Type-Student').prop('checked', false);

      // Remove checked icon from all checkboxes inside filter menu
      $('.ManageClass-Filter-Main .Filter-Checkbox-Box').removeClass('fa fa-check');
   }

   $(document).on('click', '#Filter-Clear', (e) => {
      ClearFilter();
      FilterData();
      // BUG: When i click clear and then sort button, it does not work. try unbind
      LoadUsers(SortUsersArray);
      LoadSelectedUsers();
   });

   // ----------   ---------- //
   // END: Clear filter options
   // ----------   ---------- //


}
