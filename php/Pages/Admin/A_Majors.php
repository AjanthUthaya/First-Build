<div class="Major-Title-Main">

  <a class="Major-Title-Left button fa fa-search"></a>
  <div class="Major-Title-Title"><span>Majors</span></div>
  <a class="Major-Title-Right button" id="AddMajor">Add major</a>

</div>

<div class="Major-Search-Main">
  <input id="Search-Major" type="text" placeholder="Search...">
</div>

<div class="Major-Content">

  <div class="Major-List">


    <?php
    // DB config
    require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

    // MySQLi statement
    $QueryMajors = "SELECT * FROM majors ORDER BY major";
    // Connect and run query
    $ResultMajors = $conn->query($QueryMajors);

    if ($ResultMajors->num_rows > 0) {
          // While query is running get results
          while ($Result_Item = $ResultMajors->fetch_array()) {
              $Array_Majors[] = $Result_Item;
          }

    // Close connection
    $conn->close();

    // Print out each item in array
    foreach ($Array_Majors as $Major) { ?>

      <div class="Major-Item" style="background: <?php echo $Major['color'] ?>;">
        <div class="Major-Item-Container">
          <a class="Major-Item-Title" href="EditMajor.php?Major_Id=<?php echo $Major['id'] ?>" data-major_id="<?php echo $Major['id'] ?>"><?php echo $Major['major'] ?> (<?php echo $Major['code'] ?>)</a>
        </div>
      </div>

    <?php } } else { ?>
      <div class="Major-No-Result">
        <h3>No majors found in the database</h3>
      </div>
    <?php } ?>


  </div>

</div>

<!-- Add major to DB using AJAX -->
<div id="AddMajor-Modal" class="modal">

  <div class="Modal-Header AddMajor-Header">
    <label>Add new major</label>
    <a rel="modal:close">x</a>
  </div>


  <form id="AddMajorForm">
    <div class="AddMajor-Title">
      <div class="AddMajor-Title-Major">
        <label>Major</label>
        <input type="text" id="AddMajor-Major" placeholder="Eks. Engelsk">
      </div>

      <div class="AddMajor-Title-Code">
        <label>Code</label>
        <input type="text" id="AddMajor-Code" placeholder="Eks. 2ENG">
      </div>
    </div>


    <div class="AddMajor-Details">
      <!--
      <div class="AddMajor-Details-Vgs">
        <label>VGS</label>
        <select class="AddMajor-Vgs-Value" id="AddMajor-Vgs">
          <option value="" selected disabled>Select VGS</option>
          <option value="All">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      -->

      <div class="AddMajor-Details-Color">
        <label>Color</label>
        <input type="color" value="#35414d" id="AddMajor-Color">
      </div>

      <div class="AddMajor-Details-Hours">
        <label>Hours(45m)</label>
        <input type="number" id="AddMajor-Hours" placeholder="Eks. 148">
      </div>
    </div>
  </form>


  <div class="AddMajor-Buttons">

    <a class="button" id="AddMajor-Confirm">Add major</a>

  </div>

</div>
