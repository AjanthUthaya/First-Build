<div class="Major-Title-Main">

  <a class="Major-Title-Left button fa fa-search"></a>
  <div class="Major-Title-Title"><span>Majors</span></div>
  <a class="Major-Title-Right button" id="AddMajor">Add major</a>

</div>

<div class="Major-Search-Main">
  <input id="List-Search" type="text" placeholder="Type here to search...">
</div>

<div class="Major-Content">

  <div id="List-Main">


    <table id="List" class="stripe">
      <thead>
        <tr>
          <th>Code</th>
          <th>Title</th>
          <th>Year</th>
          <th>Students/Teachers</th>
          <th>H1</th>
          <th>H2</th>
        </tr>
      </thead>
      <tbody>
        <?php

        // &&&&& # DB CONFIG # &&&&& //
        require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

        // &&&&& # DOC RESPONSE FUNCTION # &&&&& //
        require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/DocResponse.php');

        // _____ # GET MAJORS # _____ //
        $QueryGetMajors = 'SELECT majors.id, majors.code, majors.title, years.title, majors.hours_one, majors.hours_two
        FROM majors
        INNER JOIN years ON majors.year_id = years.id
        WHERE majors.id != 0
        ORDER BY majors.code';

        // ***** # PREPARE STATEMENT # ***** //
        if (!($stmt = $conn->prepare($QueryGetMajors))) {
          DocResponse("Error", "", "Prepareing statement");
          exit();
        }

        // ***** # EXECUTE STATEMENT # ***** //
        if (!$stmt->execute()) {
          DocResponse("Error", "", "Executing statement");
          exit();
        }

        // # STORE RESULT # //
        $stmt->store_result();

        // # BIND RESULT TO VARIABLES # //
        $stmt->bind_result($Id, $Code, $Title, $Year, $Hours_One, $Hours_Two);

        // ***** # CHECK IF RESULT IS EMPTY # ***** //
        if ($stmt->num_rows !== 0) {

          // _____ # START: LOOP THROUGH ROWS AND PRINT DATA # _____ //

          while ($row = $stmt->fetch()) {
            ?>
            <tr data-id="<?php echo $Id; ?>">
              <td><?php echo $Code; ?></td>
              <td><?php echo $Title; ?></td>
              <td><?php echo $Year; ?></td>
              <td>In development</td>
              <td><?php echo $Hours_One; ?></td>
              <td><?php echo $Hours_Two; ?></td>
            </tr>
            <?php
          }

          // _____ # END: LOOP THROUGH ROWS AND PRINT DATA # _____ //

        } else {
          // # IF RESULT IS EMPTY, ALERT USER # //
          DocResponse("Failed", "", "No majors found in DB");
        }

        // Close prepared statement
        $stmt->close();

        ?>
      </tbody>
    </table>

  </div>

</div>



<!-- _____ # START: FORM TO ADD NEW MAJOR # _____ -->

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

<!-- _____ # START: FORM TO ADD NEW MAJOR # _____ -->





<!-- _____ # START: FORM TO EDIT MAJOR # _____ -->

<div id="EditMajor-Modal" class="modal">

  <div class="Modal-Header EditMajor-Header">
    <label>Title</label>
    <a rel="modal:close">x</a>
  </div>


  <form id="EditMajorForm">

    <!-- # ACCORDION CONTAINER # -->
    <div class="Accordion-Container">
      <!-- # ACCORDION EDIT BUTTON AND TITLE # -->
      <div class="EditMajor-Accordion-Title-Container">
        <a class="button">Edit</a><label class="Accordion-Link">Hours and Color</label>
      </div>

      <!-- # ACCORDION CONTENT # -->
      <div class="Accordion-Content">
        <!-- # HOURS CONTAINER # -->
        <div class="EditMajor-Hours">

            <!-- # HOURS TITLE # -->
            <label class="EditMajor-Hours-Title">Hours(45m)</label>

            <div class="EditMajor-Hours-Container">
            <!-- # H1 # -->
            <div class="EditMajor-Hours-H_One">
              <label>H1</label>
              <input class="Hours-H_One-InputLabel" type="text" value="78">
            </div>

            <!-- # H2 # -->
            <div class="EditMajor-Hours-H_Two">
              <label>H2</label>
              <input class="Hours-H_One-InputLabel" type="text" value="94">
            </div>
          </div>
        </div>


        <!-- # COLOR CONTAINER # -->
        <div class="EditMajor-Color">
          <label class="EditMajor-Color-Title">Color</label>
          <input class="Hours-H_One-ColorLabel" type="color" value="#35414d">
        </div>
      </div>
    </div>

    <!-- # ACCORDION CONTAINER # -->
    <div class="Accordion-Container">
      <!-- # ACCORDION EDIT BUTTON AND TITLE # -->
      <div class="Participants-Title-Container">
        <a class="button">Edit</a><label class="Participants-Title">Participants - (12 / 140)</label>
      </div>

      <!-- # ACCORDION CONTENT # -->
      <div class="Participants-Content-Container">
        <p><b>Not yet developed</b></p>
      </div>
    </div>

  </form>

</div>

<!-- _____ # END: FORM TO EDIT MAJOR # _____ -->



<!-- _____ # START: SELECT PARTICIPANTS POPUP # _____ -->

<div id="EditMajorParticipants-Modal" class="modal">

  <input type="hidden" id="EditMajorParticipants" value="">

  <div class="Modal-Header">
    <label>Select participants</label>
    <a rel="modal:close">x</a>
  </div>


  <form id="EditMajorParticipants-Form">



  </form>


  <div class="Modal-Buttons">
    <a class="button Save">Save</a>
  </div>
</div>

<!-- _____ # END: SELECT PARTICIPANTS POPUP # _____ -->
