<?php if ($Filename == 'Home') { ?>

  <!-- START: Breadcrumb -->
  <div class="Breadcrumb" aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs unselectable">
      <li><span class="fa fa-home Breadcrumb-Home"></span>Home</li>
    </ul>
  </div>
  <!-- END: Breadcrumb -->

<?php } elseif ($Filename == 'Lesson') { ?>

  <!-- START: Breadcrumb -->
  <div class="Breadcrumb" aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs unselectable">
      <li><a href="<?php echo $URI_Home ?>"><span class="fa fa-home Breadcrumb-Home"></span>Home</a></li>
      <li>Lesson</li>
    </ul>
  </div>
  <!-- END: Breadcrumb -->

<?php } elseif ($Filename == 'Majors') { ?>

  <!-- START: Breadcrumb -->
  <div class="Breadcrumb" aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs unselectable">
      <li><a href="<?php echo $URI_Home ?>"><span class="fa fa-home Breadcrumb-Home"></span>Home</a></li>
      <li>Major</li>
    </ul>
  </div>
  <!-- END: Breadcrumb -->

<?php } elseif ($Filename == 'EditMajor') { ?>

  <!-- START: Breadcrumb -->
  <div class="Breadcrumb" aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs unselectable">
      <li><a href="<?php echo $URI_Home ?>"><span class="fa fa-home Breadcrumb-Home"></span>Home</a></li>
      <li><a href="<?php echo $URI_Majors ?>">Major</a></li>
      <li>Edit major</li>
    </ul>
  </div>
  <!-- END: Breadcrumb -->

<?php } elseif ($Filename == 'NewLesson') { ?>

  <!-- START: Breadcrumb -->
  <div class="Breadcrumb" aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs unselectable">
      <li><a href="<?php echo $URI_Home ?>"><span class="fa fa-home Breadcrumb-Home"></span>Home</a></li>
      <li><a href="<?php echo $URI_Lesson ?>">Lesson</a></li>
      <li>New lesson</li>
    </ul>
  </div>
  <!-- END: Breadcrumb -->

<?php } elseif ($Filename == 'NewTest') { ?>

  <!-- START: Breadcrumb -->
  <div class="Breadcrumb" aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs unselectable">
      <li><a href="<?php echo $URI_Home ?>"><span class="fa fa-home Breadcrumb-Home"></span>Home</a></li>
      <li><a href="<?php echo $URI_Test ?>">Test</a></li>
      <li>New test</li>
    </ul>
  </div>
  <!-- END: Breadcrumb -->

<?php } elseif ($Filename == 'Test') { ?>

  <!-- START: Breadcrumb -->
  <div class="Breadcrumb" aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs unselectable">
      <li><a href="<?php echo $URI_Home ?>"><span class="fa fa-home Breadcrumb-Home"></span>Home</a></li>
      <li>Test</li>
    </ul>
  </div>
  <!-- END: Breadcrumb -->

<?php } elseif ($Filename == 'Rooms') { ?>

  <!-- START: Breadcrumb -->
  <div class="Breadcrumb" aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs unselectable">
      <li><a href="<?php echo $URI_Home ?>"><span class="fa fa-home Breadcrumb-Home"></span>Home</a></li>
      <li>Rooms</li>
    </ul>
  </div>
  <!-- END: Breadcrumb -->

<?php } ?>
