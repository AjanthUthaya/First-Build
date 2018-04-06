<!-- START: User dropdown menu -->
<div class="dropdown-pane" id="User-Menu-Dropdown" data-dropdown data-close-on-click="true">
  <!-- START: Container for user menu dropdown tabs -->
  <div class="Slider">

    <!-- START: Main tab -->
    <div class="Tab-Main">
      <div class="User-Menu-Image">
        <img src="img/Profile_Placeholder.png" id="Profile-Img-Main" alt="Profile-Picture-Main">
      </div>

      <div class="User-Menu-Name">
        <label class="unselectable" id="User-Name-Dropdown"></label>
      </div>

      <div class="User-Menu-Content grid-x">
        <a class="cell Profile" data-tabvalue="view">Profile</a>
        <a class="cell Notifi" data-tabvalue="view">Notification</a>
        <a id="Logout-Main" class="cell">Logout</a>
      </div>
    </div>
    <!-- END: Main tab -->

    <!-- START: Profile tab -->
    <div class="Tab-Profile">
      <div class="Tab-Profile-Content">

        <div class="Profile-Content-Head">
          <a class="Profile" data-tabvalue="back"><span class="fa fa-arrow-left"></span></a>
          <label>Profile</label>
        </div>

        <div class="Profile-Content-Content ChildScroll">
          <div class="Profile-Content-Image">
            <div class="Content-Image-Main">
              <span class="Profile-Img-Close">x</span>
              <span id="Content-Image-Text" class="unselectable">Select image</span>
              <div class="Profile-Img-Error">
                <label id="Img-Error-Limit"></label>
                <label id="Img-Error-Current"></label>
              </div>
              <img src="img/Profile_Placeholder.png" id="Profile-Img-Edit" alt="Profile-Picture-Edit">
              <input type="file" id="Profile-Img-Src" accept="image/png, image/jpg, image/jpeg" name="ImgSrc" style="display: none;">

            </div>
          </div>

          <div class="Profile-Content-Name">
            <label class="unselectable" id="User-Name-Profile"></label>
          </div>

          <div class="Profile-Content-Email">
            <label>Email</label>

            <div class="Profile-Content-Group">
              <i class="fa fa-envelope"></i>
              <input type="text" id="User-Email-Profile" name="Profile-Email-Edit">
            </div>
          </div>

          <div class="Profile-Content-Phone">
            <label>Phone</label>

            <div class="Profile-Content-Group">
              <i class="fa fa-phone"></i>
              <input type="text" id="User-Phone-Profile" name="Profile-Phone-Edit">
            </div>
          </div>

          <div class="Profile-Content-Save">
            <a id="Save-Profile-Content" class="cell">Save</a>
          </div>
        </div>

      </div>
    </div>
    <!-- END: Profile tab -->

    <!-- START: Notification tab -->
    <div class="Tab-Notifi">
      <div class="Tab-Notifi-Content">
        <div class="Notifi-Content-Head">
          <a class="Notifi" data-tabvalue="back"><span class="fa fa-arrow-left"></span></a>
          <label>Notification</label>
        </div>
        <div class="Notifi-Content-Content">

          <!-- <div class="Notifi-Content-Item">
            <span class="fa fa-user"></span>
            <div class="Notifi-Content-Item-Content">
              <label>Norsk</label>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div> -->

        </div>
      </div>
    </div>
    <!-- END: Notification tab -->

  </div>
  <!-- END: Container for user menu dropdown tabs -->
</div>
<!-- END: User dropdown menu -->
