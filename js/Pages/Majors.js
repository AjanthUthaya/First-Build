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
            value: 1
         },
         {
            text: "2018/2019",
            value: 2
         },
         {
            text: "2020/2021",
            value: 3
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
      $('#AddMajor-Color').unbind('#AddMajor-Color').change(function() {
         $('.AddMajor-Header').css('background-color', $(this).val());
      });

      // # CAPITALIZE FIRST LETTER OF MAJOR NAME # //
      $("#AddMajor-Title").unbind('#AddMajor-Title').on("input", function(e) {
         console.log('input');
         var txt = $(this).val();
         txt = txt.substring(0, 1).toUpperCase() + txt.substring(1);
         $(this).val(txt);
      });

      // # CAPITALIZE ALL LETTERS OF MAJOR CODE # //
      $(document).unbind('#AddMajor-Code').on('input', '#AddMajor-Code', (e) => {
         e.target.value = e.target.value.toUpperCase();
      });

      // # ONLY ALLOW NUMBERS (0-9), RegEx # //
      $('#AddMajor-Hours_One, #AddMajor-Hours_Two').unbind('#AddMajor-Hours_One, #AddMajor-Hours_Two').on("input", function(e) {
         if (/\D/g.test(this.value)) {
            // Filter non-digits from input value.
            this.value = this.value.replace(/\D/g, '');
         }
      });

   });

   // =============== END =============== //
   // # ADD MAJOR POPUP #
   // =============== END =============== //

}
