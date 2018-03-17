<!-- ____________________ START: JS files ____________________ -->


<!-- START: Basic foundation and init -->
<script src="js/Addons/Foundation/vendor/jquery.js"></script>
<script src="js/Addons/Foundation/vendor/what-input.js"></script>
<script src="js/Addons/Foundation/vendor/foundation.js"></script>
<!-- End: Basic foundation files and init -->

<!-- Addon: iziToast -->
<script src="js/Addons/iziToast/iziToast.js"></script>

<!-- NOTE: General scripts for all pages -->
<script src="js/Partials/app.js"></script>


<?php if ($Filename == 'Home') { ?>


  <!-- START: Calendar and init -->
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_readonly.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_limit.js"></script>
  <!--<script src="js/dhtmlxscheduler_tooltip.js"></script>-->
  <script src="js/Calendar/CalendarInit.js"></script>
  <!-- END: Calendar and init -->


<?php } elseif ($Filename == 'Lesson') { ?>


  <!-- START: Get data from source -->
  <script src="js/Calendar/CalendarInitLesson.js"></script>
  <!-- END: Get data from source -->


<?php } elseif ($Filename == 'Majors') { ?>


  <!-- START: Page specific scripts -->
  <script src="js/Pages/Major.js"></script>
  <!-- END: Page specific scripts -->


<?php } elseif ($Filename == 'NewLesson') { ?>


  <!-- START: Calendar and init -->
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_timeline.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_treetimeline.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_collision.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_minical.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_tooltip.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_container_autoresize.js"></script>
  <script src="js/Calendar/CalendarInitNewLesson.js"></script>
  <!-- END: Calendar and init -->

  <!-- START: Addons -->
  <script src="js/Addons/PowerTip/Powertip.js"></script>
  <script src="js/Addons/DropDownSlick/DDSlick.js"></script>
  <!-- END: Addons -->


  <!-- START: Script to change event color -->
  <script>
    $("#ColorSelector").on("change", function() {
      //Get Color
      var color = $("#ColorSelector").val();
      //apply cuurent color to div
      $(".Cal-Type").css("background", color);
    });
  </script>
  <!-- END: Script to change event color -->


<?php } elseif ($Filename == 'NewTest') { ?>


  <!-- START: Calendar and init -->
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_timeline.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_treetimeline.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_collision.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_minical.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_tooltip.js"></script>
  <script src="js/Addons/Dhtmlx/dhtmlxscheduler_container_autoresize.js"></script>
  <script src="js/Calendar/CalendarInitNewTest.js"></script>
  <!-- END: Calendar and init -->


  <!-- START: Addons -->
  <script src="js/Addons/PowerTip/Powertip.js"></script>
  <script src="js/Addons/DropDownSlick/DDSlick.js"></script>
  <!-- END: Addons -->


  <!-- START: Script to change event color -->
  <script>
    $("#ColorSelector").on("change", function() {
      //Get Color
      var color = $("#ColorSelector").val();
      //apply cuurent color to div
      $(".Cal-Type").css("background", color);
    });
  </script>
  <!-- END: Script to change event color -->


<?php } elseif ($Filename == 'Test') { ?>


  <!-- START: Get data from source -->
  <script src="js/Calendar/CalendarInitTest.js"></script>
  <!-- END: Get data from source -->


<?php } ?>


<!-- START: Partial scripts -->
<script src="js/Partials/ScrollHideNav.js"></script>
<script src="js/Partials/SliderForProfile.js"></script>
<script src="js/Partials/User_Data.js"></script>
<script src="js/Partials/Profile_Update.js"></script>
<script src="js/Partials/Logout.js"></script>
<script src="js/Partials/PreventParentScroll.js"></script>
<!-- End: Partial scripts -->


<!-- ____________________ END: JS files ____________________ -->
