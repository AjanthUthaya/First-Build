<!-- START: OffCanvas menu -->
<div class="off-canvas position-left Menu-OffCanvas-Main ChildScroll" id="offCanvas" data-off-canvas data-transition="overlap">

  <div class="OffCanvas-Menu-Content">


    <div class="OffCanvas-Menu-List">
      <div class="Menu-OffCanvas-Head">
        <div class="Menu-OffCanvas-Title-Main">
          <h3 class="Menu-OffCanvas-Title unselectable">Menu</h3>
        </div>
      </div>

      <ul class="vertical menu align-center">
        <li><a href="<?php echo $URI_Home ?>" class="<?php echo ($Filename=='Home') ? "OffCanvas-Menu-List-Active" : "" ?>">Home</a></li>
        <li><a href="<?php echo $URI_Lesson ?>" class="<?php echo ($Filename=='Lesson') ? "OffCanvas-Menu-List-Active" : "" ?>">Lessons</a></li>
        <?php if ($_SESSION['DB_User_Type'] == 'Admin') { ?>

          <li><a href="<?php echo $URI_Majors ?>" class="<?php echo ($Filename=='Majors') ? "OffCanvas-Menu-List-Active" : "" ?>">Majors</a></li>
          <li><a href="<?php echo $URI_Rooms ?>" class="<?php echo ($Filename=='Rooms') ? "OffCanvas-Menu-List-Active" : "" ?>">Rooms</a></li>

        <?php } ?>
      </ul>
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
