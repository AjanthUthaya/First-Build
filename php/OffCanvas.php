<!-- START: OffCanvas menu -->
<div class="off-canvas position-left Menu-OffCanvas-Main ChildScroll" id="offCanvas" data-off-canvas data-transition="overlap">

  <div class="OffCanvas-Menu-Content">


    <div class="OffCanvas-Menu-List">
      <div class="Menu-OffCanvas-Head">


        <div class="Menu-OffCanvas-Title-Main">

          <h3 class="Menu-OffCanvas-Title unselectable">Menu</h3>

        </div>

      </div>

      <?php if ($Filename == 'Home') { ?>

      <ul class="vertical menu align-center">
        <li><a href="<?php echo $URI_Home ?>" class="OffCanvas-Menu-List-Active">Home</a></li>
        <li><a href="<?php echo $URI_Lesson ?>">Lesson</a></li>
        <li><a href="<?php echo $URI_Major ?>" data-toggle="Sub-Major">Major</a></li>
        <li><a href="<?php echo $URI_Test ?>">Test</a></li>
      </ul>

      <?php } elseif ($Filename == 'Lesson') { ?>

        <ul class="vertical menu align-center">
          <li><a href="<?php echo $URI_Home ?>">Home</a></li>
          <li><a href="<?php echo $URI_Lesson ?>" class="OffCanvas-Menu-List-Active">Lesson</a></li>
          <li><a href="<?php echo $URI_Major ?>" data-toggle="Sub-Major">Major</a></li>
          <li><a href="<?php echo $URI_Test ?>">Test</a></li>
        </ul>

      <?php } elseif ($Filename == 'Majors') { ?>

        <ul class="vertical menu align-center">
          <li><a href="<?php echo $URI_Home ?>">Home</a></li>
          <li><a href="<?php echo $URI_Lesson ?>">Lesson</a></li>
          <li><a href="<?php echo $URI_Major ?>" class="OffCanvas-Menu-List-Active" data-toggle="Sub-Major">Major</a></li>
          <li><a href="<?php echo $URI_Test ?>">Test</a></li>
        </ul>

      <?php } elseif ($Filename == 'NewLesson') { ?>

        <ul class="vertical menu align-center">
          <li><a href="<?php echo $URI_Home ?>">Home</a></li>
          <li><a href="<?php echo $URI_Lesson ?>" class="OffCanvas-Menu-List-Active">Lesson</a></li>
          <li><a href="<?php echo $URI_Major ?>" data-toggle="Sub-Major">Major</a></li>
          <li><a href="<?php echo $URI_Test ?>">Test</a></li>
        </ul>

      <?php } elseif ($Filename == 'NewTest') { ?>

        <ul class="vertical menu align-center">
          <li><a href="<?php echo $URI_Home ?>">Home</a></li>
          <li><a href="<?php echo $URI_Lesson ?>">Lesson</a></li>
          <li><a href="<?php echo $URI_Major ?>" data-toggle="Sub-Major">Major</a></li>
          <li><a href="<?php echo $URI_Test ?>" class="OffCanvas-Menu-List-Active">Test</a></li>
        </ul>

      <?php } elseif ($Filename == 'Test') { ?>

        <ul class="vertical menu align-center">
          <li><a href="<?php echo $URI_Home ?>">Home</a></li>
          <li><a href="<?php echo $URI_Lesson ?>">Lesson</a></li>
          <li><a href="<?php echo $URI_Major ?>" data-toggle="Sub-Major">Major</a></li>
          <li><a href="<?php echo $URI_Test ?>" class="OffCanvas-Menu-List-Active">Test</a></li>
        </ul>

      <?php } ?>

    </div>

    <div class="OffCanvas-Menu-Social unselectable">

      <span><a href="<?php echo $URI_Facebook ?>" target="_blank" class="fa fa-facebook-square"></a></span>
      <span><a href="<?php echo $URI_Youtube ?>" target="_blank" class="fa fa-youtube-play"></a></span>
      <span><a href="<?php echo $URI_Instagram ?>" target="_blank" class="fa fa-instagram"></a></span>
      <span><a href="<?php echo $URI_LinkedIn ?>" target="_blank" class="fa fa-linkedin"></a></span>
      <span><a href="<?php echo $URI_Twitter ?>" target="_blank" class="fa fa-twitter"></a></span>

    </div>

  </div>

</div>
<!-- END: OffCanvas menu -->
