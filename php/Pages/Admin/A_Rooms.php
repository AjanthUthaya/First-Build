<div class="Room-Title-Main">

  <div class="Room-Title-Left"></div>
  <div class="Room-Title-Title"><span>Rooms</span></div>
  <a class="Room-Title-Right button">Add/Edit</a>

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
