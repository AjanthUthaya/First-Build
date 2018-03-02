

<!-- START: Navigation -->
<nav class="scrollhide-nav">
  <!-- START: Top navigation -->
  <div class="top-bar Top-Bar-Main">


    <!-- ____________________ START: Top nav ____________________ -->
    <!-- START: Left section of navigation -->
    <div class="top-bar-left">
      <span class="Top-Bar-Menu"><a class="fa fa-bars" data-toggle="offCanvas"></a></span>
    </div>
    <!-- END: Left section of navigation -->

    <!-- START: Middle section of navigation -->
    <div class="Top-Bar-Center-Logo Top-Bar-Logo">

      <div class="Triangle-Left">
      </div>

      <div class="Rectangle">
        <a href="<?php echo $URI_Home ?>"><img src="http://via.placeholder.com/50x50" alt="Logo-TopNav" id="TopBar-Logo" class="unselectable"/></a>
      </div>

      <div class="Triangle-Right">
      </div>

    </div>
    <!-- END: Middle section of navigation -->

    <!-- START: Right section of navigation -->
    <div class="top-bar-right">
      <ul class="menu medium-horizontal">
        <li class="menu" data-toggle="User-Menu-Dropdown">
          <label id="User-Name-Main"></label><span class="Top-Bar-Menu"><a class="fa fa-user-circle"></a></span>
        </li>
      </ul>
    </div>
    <!-- START: Right section of navigation -->
    <!-- ____________________ END: Top nav ____________________ -->


    <?php include 'UserMenu.php'; ?>


  </div>
  <!-- END: Top navigation -->

  <?php include 'Breadcrumb.php'; ?>

</nav>
<!-- END: Navigation -->
