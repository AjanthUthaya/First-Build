<?php

// # ARRAY TO STORE SCRIPTS # //
$ScriptsData = array();


// ### START: FUNCTION TO GET SCRIPTS FROM DIFFRENT CATEGORIES ### //

function GetScripts($Data, $Category) {
  foreach($Data as $key => $value) {
    foreach ($value as $CatKey => $CatValue) {
      // # IN CATEGORY, WITH 'Addons' AND 'Specific' # //

      // # TARGET 'SPECIFIC' ARRAY, AND MAKE SURE IT IS NOT EMPTY # //
      if ($CatKey == $Category && !empty($CatValue)) {
        foreach ($CatValue as $ScriptKey => $ScriptValue) {
          // # IN SCRIPTS ARRAY, WITH 'Name' AND 'Src' # //
          ?>
          <!-- # <?php echo $ScriptValue['Name']; ?> # -->
          <link rel="stylesheet" href="<?php echo $ScriptValue['Src']; ?>">
          <?php
        }
      }

    }
  }
}

// ### END: FUNCTION TO GET SCRIPTS FROM DIFFRENT CATEGORIES ### //



// ========== START ========== //
// # DECLARE ADDONS #
// ========== START ========== //

// # DHTMLX_SCHEDULER # //
$Addon_DHTMLXScheduler = array(
  'Name' => 'DHTMLX Scheduler',
  'Src' => 'css/dhtmlxscheduler.css'
);

// # POWER_TIP # //
$Addon_PowerTip = array(
  'Name' => 'PowerTip',
  'Src' => 'css/Powertip.css'
);

// # JQUERY_MODAL # //
$Addon_JqueryModal = array(
  'Name' => 'Jquery Modal',
  'Src' => 'css/JqueryModal.css'
);

// # DATA_TABLES # //
$Addon_DataTables = array(
  'Name' => 'Data Tables',
  'Src' => 'css/DataTables.css'
);

// ========== END ========== //
// # DECLARE ADDONS #
// ========== END ========== //





// ========== START ========== //
// # DECLARE SCRIPTS NEEDED FOR EACH PAGE #
// ========== START ========== //

if ($Filename == 'Home') {

  array_push($ScriptsData, array(
    'Addons' => array(
      // # DHTMLX_SCHEDULER # //
      $Addon_DHTMLXScheduler
    ),

    'Specific' => array(
      array(
        'Name' => 'Home',
        'Src' => 'css/appPages/appHome.css'
      )
    )
  ));

} elseif ($Filename == 'Lesson') {

  array_push($ScriptsData, array(
    'Addons' => array(
      // # NO ADDONS # //
    ),

    'Specific' => array(
      array(
        'Name' => 'Lesson',
        'Src' => 'css/appPages/appLesson.css'
      )
    )
  ));

} elseif ($Filename == 'Majors') {

  array_push($ScriptsData, array(
    'Addons' => array(
      // # JQUERY MODAL # //
      $Addon_JqueryModal,
      // # DATA_TABLES # //
      $Addon_DataTables
    ),

    'Specific' => array(
      array(
        'Name' => 'Majors',
        'Src' => 'css/appPages/appMajors.css'
      )
    )
  ));

} elseif ($Filename == 'NewLesson') {

  array_push($ScriptsData, array(
    'Addons' => array(
      // # DHTMLX_SCHEDULER # //
      $Addon_DHTMLXScheduler,
      // # POWER_TIP # //
      $Addon_PowerTip
    ),

    'Specific' => array(
      array(
        'Name' => 'New Lesson',
        'Src' => 'css/appPages/appNewLesson.css'
      )
    )
  ));

} elseif ($Filename == 'Rooms') {

  array_push($ScriptsData, array(
    'Addons' => array(
      // # JQUERY_MODAL # //
      $Addon_JqueryModal
    ),

    'Specific' => array(
      array(
        'Name' => 'Rooms',
        'Src' => 'css/appPages/appRooms.css'
      )
    )
  ));

} elseif ($Filename == 'Classes') {

  array_push($ScriptsData, array(
    'Addons' => array(
      // # JQUERY_MODAL # //
      $Addon_JqueryModal,
      // # DATA_TABLES # //
      $Addon_DataTables
    ),

    'Specific' => array(
      array(
        'Name' => 'Classes',
        'Src' => 'css/appPages/appClasses.css'
      )
    )
  ));

}

// ========== END ========== //
// # DECLARE SCRIPTS NEEDED FOR EACH PAGE #
// ========== END ========== //

?>



<!-- ____________________ START: CSS files ____________________ -->

<!-- # START: ADDON SCRIPTS # -->

<!-- # Foundation # -->
<link rel="stylesheet" href="css/foundation.css">
<!-- # Font Awesome # -->
<link rel="stylesheet" href="css/font-awesome.css">
<!-- # iziToast # -->
<link rel="stylesheet" href="css/iziToast.css">
<!-- # SimpleBar # -->
<link rel="stylesheet" href="css/simplebar.css">

<?php GetScripts($ScriptsData, 'Addons'); ?>

<!-- # END: ADDON SCRIPTS # -->

<!-- # START: GENERAL SCRIPTS # -->
<link rel="stylesheet" href="css/appPartials/appGeneral.css">
<link rel="stylesheet" href="css/appPartials/appFooter.css">
<link rel="stylesheet" href="css/appPartials/appTopNav.css">
<link rel="stylesheet" href="css/appPartials/appUserDropdownMenu.css">
<link rel="stylesheet" href="css/appPartials/appBreadcrumb.css">
<link rel="stylesheet" href="css/appPartials/appOffCanvasMenu.css">
<!-- # END: GENERAL SCRIPTS # -->


<!-- # START: PAGE SPECIFIC SCRIPT/S # -->
<?php GetScripts($ScriptsData, 'Specific'); ?>
<!-- # END: PAGE SPECIFIC SCRIPT/S # -->

<!-- ____________________ END: CSS files ____________________ -->
