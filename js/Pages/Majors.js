function init() {

   // &&&&& # Notify # &&&&& //
   require("js/Functions/Notify.js");



   // =============== START =============== //
   // # TOGGLE SEARCH BAR #
   // =============== START =============== //

   $('.Major-Title-Left').on('click', function(event) {

      // # SHOW SEARCH BAR # //
      $('.Major-Search-Main').toggleClass('Major-Search-Show');

      // # FOCUS ON INPUT # //
      $("#Search-Major").focus();

   });

   // =============== END =============== //
   // # TOGGLE SEARCH BAR #
   // =============== END =============== //





   // =============== START =============== //
   // # SEARCH ENGINE FOR MAJORS #
   // =============== START =============== //

   $("#Search-Major").on("keyup", function(event) {

      // # FILTERS MAJORS ON INPUT # //
      var value = $(this).val().toLowerCase();
      $(".Major-List .Major-Item").filter(function() {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });

   });

   // =============== END =============== //
   // # SEARCH ENGINE FOR MAJORS #
   // =============== END =============== //





   // =============== START =============== //
   // # ADD MAJOR POPUP (NB: UNBIND ALL) #
   // =============== START =============== //

   $("#AddMajor").on("click", function(e) {


      // ========== START ========== //
      // # YEAR LIST #
      // ========== START ========== //

      // Year data
      var Year = [{
            text: "2017/2018",
            value: 33
         },
         {
            text: "2018/2019",
            value: 41
         },
         {
            text: "2020/2021",
            value: 30
         }
      ];

      // INIT DDSlick for year list
      $('#AddMajor-Year').ddslick({
         data: Year,
         selectText: 'Select year'
      });

      // ========== END ========== //
      // # YEAR LIST #
      // ========== END ========== //



      // # SHOW MODAL # //
      $("#AddMajor-Modal").modal({
         fadeDuration: 250,
         fadeDelay: 0.50
      });

      // # ON COLOR SELECTION, CHANGE COLOR OF HEADER # //
      $('#AddMajor-Color').unbind('change').change(function() {
         $('.AddMajor-Header').css('background-color', $(this).val());
      });

      // # CAPITALIZE FIRST LETTER OF MAJOR NAME # //
      $("#AddMajor-Title").unbind('input').on("input", function(e) {
         var txt = $(this).val();
         txt = txt.substring(0, 1).toUpperCase() + txt.substring(1);
         $(this).val(txt);
      });

      // # CAPITALIZE ALL LETTERS OF MAJOR CODE # //
      $('#AddMajor-Code').unbind('input').on('input', (e) => {
         e.target.value = e.target.value.toUpperCase();
      });

      // # ONLY ALLOW NUMBERS (0-9), RegEx # //
      $('#AddMajor-Hours_One, #AddMajor-Hours_Two').unbind('input').on("input", function(e) {
         if (/\D/g.test(this.value)) {
            // Filter non-digits from input value.
            this.value = this.value.replace(/\D/g, '');
         }
      });


      // ========== START ========== //
      // # POST DATA TO SERVER FOR PROCESSING #
      // ========== START ========== //




      // # VARIABLE TO STORE REQUEST # //
      var RequestNewMajor;

      // # BIND TO FORM SUBMIT # //
      $("#AddMajorForm").submit(function(event) {

         // # PREVENT DEFAULT FORM SUBMIT ACTIONS # //
         event.preventDefault();

         // # ABORT ANY PENDING REQUESTS # //
         if (RequestNewMajor) {
            RequestNewMajor.abort();
         }



         // ----- START: DISABLE FORM ACTIONS ----- //

         // # TARGET ALL INPUTS AND BUTTONS # //
         var Inputs = $(this).find("input, select, button, textarea, a");
         // # DISABLE ALL TARGET ITEMS # //
         Inputs.prop("disabled", true);

         // ----- END: DISABLE FORM ACTIONS ----- //



         // ### START: FUNCTION TO VALIDATE FORM, AND POST DATA ### //
         function SubmitNewMajor() {

            // ----- START: GET CURRENT VALUES AND STORE ----- //

            // # NEW JSON OBJECT, TO STORE VALUES # //
            var NewMajorApp = {};


            // # MAJOR - TITLE # //
            NewMajorApp.Title = {
               Name: 'Title',
               Target: $('#AddMajor-Title'),
               Value: $('#AddMajor-Title').val()
            };
            // # MAJOR - CODE # //
            NewMajorApp.Code = {
               Name: 'Code',
               Target: $('#AddMajor-Code'),
               Value: $('#AddMajor-Code').val()
            };
            // # MAJOR - YEAR # //
            NewMajorApp.Year = {
               Name: 'Year',
               Target: $('#AddMajor-Year .dd-selected'),
               Value: $('#AddMajor-Year .dd-selected-value').val()
            };
            // # MAJOR - COLOR # //
            NewMajorApp.Color = {
               Name: 'Color',
               Target: $('#AddMajor-Color'),
               Value: $('#AddMajor-Color').val()
            };
            // # MAJOR - H1 # //
            NewMajorApp.Hours_One = {
               Name: 'Hours_One',
               Target: $('#AddMajor-Hours_One'),
               Value: $('#AddMajor-Hours_One').val(),
               Optinal: true
            };
            // # MAJOR - H2 # //
            NewMajorApp.Hours_Two = {
               Name: 'Hours_Two',
               Target: $('#AddMajor-Hours_Two'),
               Value: $('#AddMajor-Hours_Two').val(),
               Optinal: true
            };

            // ----- END: GET CURRENT VALUES AND STORE ----- //



            // ----- START: VALIDATE INPUT DATA ----- //

            // # DEFINE VARIABLE TO STORE VALIDATION # //
            var ValidationFailed = true;

            // ### SIMPLE FUNCTION TO PULSE ### //
            function ValidationPulse(TargetElement) {
               var FailedInput = $(TargetElement);
               FailedInput.css('animation', 'ValidationPulse 0.9s infinite');

               setTimeout(function() {
                  FailedInput.css('animation', 'none');
               }, 1800);
            }


            // # LOOP THROUGH DATA, CHECK THEY MATCH VALIDATION PARAMETERS # //
            $.each(NewMajorApp, function(key, data) {

               // ????? # CHECK IF ANY OF THE NON-OPTINAL VALUES ARE EMPTY # ????? //
               if (!data.Value && data.Optinal == undefined) {
                  ValidationPulse(data.Target);
                  ValidationFailed = false;
               }

               // ***** # TITLE # ***** //
               if (data.Name == 'Title') {
                  // ????? # CHECK IF LENGTH IS OVER 40 # ????? //
                  if (data.Value.length > 40) {
                     ValidationPulse(data.Target);
                     ValidationFailed = false;
                  }
               }

               // ***** # CODE # ***** //
               if (data.Name == 'Code') {
                  // ????? # CHECK IF LENGTH IS OVER 20 # ????? //
                  if (data.Value.length > 20) {
                     ValidationPulse(data.Target);
                     ValidationFailed = false;
                  }
               }

               // ***** # COLOR # ***** //
               if (data.Name == 'Color') {

                  // ????? # CHECK IF COLOR IS STILL DEFAULT COLOR # ????? //
                  if (data.Value == '#35414d') {
                     ValidationPulse(data.Target);
                     ValidationFailed = false;
                  }

               }

               // ***** # H1 OR H2 # ***** //
               if (data.Name == 'Hours_One' || data.Name == 'Hours_Two') {
                  // ????? # CHECK IF LENGTH IS OVER 10 # ????? //
                  if (data.Value.length > 10) {
                     ValidationPulse(data.Target);
                     ValidationFailed = false;
                  }

                  // ????? # IF LENGHT IS 1 OR OVER, ONLY DIGITS # ????? //
                  if (data.Value.length >= 1 && !/^\d+$/.test(data.Value)) {
                     ValidationPulse(data.Target);
                     ValidationFailed = false;
                  }
               }

            });

            // # CHECK IF VALIDATION FAILED # //
            if (!ValidationFailed) {
               NotifyFailed('Form validation failed', '');
               return false;
            }

            // ----- END: VALIDATE INPUT DATA ----- //



            // ----- START: POST DATA ----- //

            var RequestAddMajor = $.ajax({
               url: "php/Single/Add_Major.php",
               type: "post",
               data: NewMajorApp,
               dataType: "json",
               async: false,
               contentType: false, // The content type used when sending data to the server.
               cache: false, // To unable request pages to be cached
               processData: false, // To send DOMDocument or non processed data file it is set to false
            });

            // # FIRES UP ON SUCCESS # //
            RequestAddMajor.done(function(data) {
               console.log('Request: Done');
            });

            // # FIRES UP ON FAILURE # //
            RequestAddMajor.fail(function(xhr, textStatus, errorThrown) {
               NotifyError('Server error', textStatus + ', failed to add new major');
            });

            // # FIRES UP NO MATTER # //
            Request.always(function() {
               // # RE-ENABLE INPUTS # //
               Inputs.prop("disabled", false);
            });

            // ----- END: POST DATA ----- //

         }

         // ### END: FUNCTION TO VALIDATE FORM, AND POST DATA ### //



         // VALIDATE AND SUBMIT FORM
         SubmitNewMajor();

      });

      // ========== END ========== //
      // # POST DATA TO SERVER FOR PROCESSING #
      // ========== END ========== //


   });

   // =============== END =============== //
   // # ADD MAJOR POPUP #
   // =============== END =============== //

}
