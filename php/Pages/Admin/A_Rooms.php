<div class="Room-Title-Main">

  <div class="Room-Title-Left"></div>
  <div class="Room-Title-Title"><span>Rooms</span></div>
  <a class="Room-Title-Right button" id="AddRoomButton">Add room</a>

</div>


<div class="Room-Content-Main">

  <ul class="accordion Accordion-Main" data-accordion data-multi-expand="true" data-allow-all-closed="true">
    <!-- Default is closed item, to change add `is-active` to accordion-item -->
    <?php

    $RoomUrl = 'php/Calendar/RoomList.php';

    function requireToVar($Path)
    {
      ob_start();
      require($Path);
      return ob_get_clean();
    }

    $RoomJson = json_decode(requireToVar($RoomUrl), true);

    foreach ($RoomJson as $ParrentRoom) {
      ?>

      <li class="accordion-item Accordion-Parrent" data-accordion-item>

        <!-- Accordion tab title -->
        <a class="accordion-title"><?php echo $ParrentRoom['label']; ?></a>

        <!-- Accordion tab content: -->
        <div class="accordion-content" data-tab-content>

          <ul class="accordion Accordion-Sub" data-accordion data-multi-expand="true" data-allow-all-closed="true">
            <?php foreach ($ParrentRoom['children'] as $ChildOne) {
              if ($ChildOne['type'] == 'Folder') {
                ?>
                <li class="accordion-item Accordion-Folder" data-accordion-item>
                  <a class="accordion-title"><?php echo $ChildOne['label']; ?></a>

                  <div class="accordion-content" data-tab-content>

                    <ul class="accordion Accordion-Sub" data-accordion data-multi-expand="true" data-allow-all-closed="true">
                      <?php foreach ($ChildOne['children'] as $ChildTwo) {  ?>
                        <li class="Accordion-Item">
                          <a class="accordion-title"><?php echo $ChildTwo['label']; ?>
                            <span class="fa fa-trash Room-Delete" id="DeleteRoomButton" value="<?php echo $ChildTwo['Room_Id']; ?>"></span>
                          </a>
                        </li>
                      <?php } ?>
                    </ul>
                  </div>

                </li>
              <?php } else { ?>
                <li class="Accordion-Item">
                  <a class="accordion-title"><?php echo $ChildOne['label']; ?>
                    <span class="fa fa-trash Room-Delete" id="DeleteRoomButton" value="<?php echo $ChildOne['Room_Id']; ?>"></span>
                  </a>
                </li>
              <?php  }} ?>
            </ul>

          </div>

        </li>

        <?php
      } ?>

    </ul>

  </div>



  <!-- Add new room to DB using AJAX -->
  <div id="AddRoom" class="modal">

    <div class="Modal-Header">
      <label>Add new room</label>
      <a rel="modal:close">x</a>
    </div>

    <form id="AddRoomForm" class="AddRoom-Content">

      <div class="Room-Input-Container">

        <div class="Room-Input">
          <label>Key(No Space)</label>
          <input id="Room-Input-Key" type="text" placeholder="Unique identifier" autofocus required>
        </div>

        <div class="Room-Input">
          <label>Label</label>
          <input id="Room-Input-Label" type="text" placeholder="Default = key" required>
        </div>

      </div>

      <div class="Room-Select-Main">
        <label>Select parent folder</label>
        <select id="Room-Select" required>

          <option value="" disabled selected>Select a value</option>

          <?php

          // DB config file
          require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

          // MySQLi statement
          $QueryParentRooms = "SELECT * FROM rooms WHERE type = 'Folder'";

          // Connect and run query
          $ResultParentRooms = $conn->query($QueryParentRooms);

          if ($ResultParentRooms->num_rows > 0) {

            // Store result in array
            while ($ResultParentRooms_Item = $ResultParentRooms->fetch_assoc()) {
              $ResultParentRooms_Array[] = $ResultParentRooms_Item;
            }

            foreach ($ResultParentRooms_Array as $SelectOptions) {
              ?>

              <option value="<?php echo $SelectOptions['key'] ?>"><?php echo $SelectOptions['label'] . '(' . $SelectOptions['key'] . ')' ?></option>

            <?php } } else { ?>

              <option value="" disabled>No parent folders found</option>

            <?php }

            // Close connection
            $conn->close();

            ?>

          </select>
        </div>

      </form id="AddRoomForm">

      <div class="AddRoom-Submit">
        <a class="AddRoom-Submit-Button button">Add room</a>
      </div>

    </div>


    <!-- Delete room from DB using AJAX -->
    <div id="DelRoom" class="modal">

      <input type="hidden" id="DeleteRoom-Id" value="">

      <div class="Modal-Header">
        <label>Delete room</label>
        <a rel="modal:close">x</a>
      </div>

      <form id="DelRoomForm">

        <div class="DelRoom-Content">

          <p>Are you sure you want to delete <span id="DelRoom-Key">206</span>?</p>

        </div>

      </form>

      <div class="DelRoom-Buttons">

        <a class="button" rel="modal:close">Cancel</a>

        <a class="button" id="DelRoom-Yes">Delete</a>

      </div>

    </div>
