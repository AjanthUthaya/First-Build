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

      <!-- TOP CONTAINER FOR TITLE AND CODE -->
      <div class="AddMajor-Container-TitleCode">
        <!-- Container for title -->
        <div class="Container-TitleCode-Title Container">
          <label class="TitleCode-Label">Title</label>
          <input class="TitleCode-Input" id="AddMajor-Title" type="text" maxlength="40" placeholder="Eks. Naturfag" autocomplete="off" required>
        </div>

        <!-- Container for code -->
        <div class="Container-TitleCode-Code Container">
          <label class="TitleCode-Label">Code</label>
          <input class="TitleCode-Input" id="AddMajor-Code" type="text" maxlength="20" placeholder="Eks. 2NAT" autocomplete="off" required>
        </div>
      </div>



      <!-- YEAR AND COLOR CONTAINER -->
      <div class="AddMajor-YearColor">
        <!-- Year container -->
        <div class="Container-Year">
        <label class="Year-Label">Year</label>
        <select id="AddMajor-Year">

        </select>
        </div>

        <!-- Color container -->
        <div class="Container-Color">
          <label class="Color-Label">Color</label>
          <input id="AddMajor-Color" type="color" value="#35414d">
        </div>
      </div>



      <!-- HOURS SECTION CONTAINER -->
      <div class="AddMajor-Hours">

        <label class="AddMajor-Hours-Title">Hours(45m)</label>

        <div class="Container-Hours">
          <!-- H1 -->
          <div class="Hours-H1">
            <label>H1*</label>
            <input id="AddMajor-Hours_One" type="text" maxlength="10" placeholder="Eks. 86" autocomplete="off">
          </div>

          <!-- H2 -->
          <div class="Hours-H2">
            <label>H2*</label>
            <input id="AddMajor-Hours_Two" type="text" maxlength="10" placeholder="Eks. 74" autocomplete="off">
          </div>
        </div>

      </div>

      <!-- BUTTON TO SUBMIT FORM -->
      <div class="AddMajor-Buttons">
        <input class="button" type="submit" id="AddMajor-Confirm" value="Submit" />
      </div>

    </form>

  </div>
