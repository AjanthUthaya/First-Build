<div class="Room-Title-Main">

  <div class="Room-Title-Left"></div>
  <div class="Room-Title-Title"><span>Rooms</span></div>
  <a class="Room-Title-Right button" id="AddRoomButton">Add/Edit</a>

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
      <a class="accordion-title"><?php echo $ParrentRoom['key'] ?></a>

      <!-- Accordion tab content: -->
      <div class="accordion-content" data-tab-content>

        <ul class="accordion Accordion-Sub" data-accordion data-multi-expand="true" data-allow-all-closed="true">
          <?php foreach ($ParrentRoom['children'] as $ChildOne) {
              if ($ChildOne['type'] == 'Folder') {
             ?>
          <li class="accordion-item Accordion-Folder" data-accordion-item>
            <a class="accordion-title"><?php echo $ChildOne['key'] ?></a>

            <div class="accordion-content" data-tab-content>

              <ul class="accordion Accordion-Sub" data-accordion data-multi-expand="true" data-allow-all-closed="true">
                <?php foreach ($ChildOne['children'] as $ChildTwo) {  ?>
                   <li class="Accordion-Item">
                     <a class="accordion-title"><?php echo $ChildTwo['key'] ?></a>
                   </li>
                <?php } ?>
              </ul>
            </div>

          </li>
        <?php } else { ?>
          <li class="Accordion-Item">
            <a class="accordion-title"><?php echo $ChildOne['key'] ?></a>
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

  <div class="AddRoom-Header">
    <label>Add new room</label>
    <a rel="modal:close">x</a>
  </div>

  <form id="AddRoomForm" class="AddRoom-Content">

    <div class="Room-Input-Container">

      <div class="Room-Input">
        <label>Key(No Space)</label>
        <input id="Room-Input-Key" type="text" autofocus>
      </div>

      <div class="Room-Input">
        <label>Label</label>
        <input id="Room-Input-Label" type="text">
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

           <option value="" disabled selected>No parent folders found</option>

         <?php }

         // Close connection
         $conn->close();

         ?>

      </select>
    </div>

  </form id="AddRoomForm">

  <div class="AddRoom-Submit">
    <a class="AddRoom-Submit-Button button">Add</a>
  </div>

</div>
