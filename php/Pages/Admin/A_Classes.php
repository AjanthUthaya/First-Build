<div class="Title-Main">

  <div class="Title-Title"><span>Classes</span></div>

  <a class="Title-Right button" id="Add-Class">Add class</a>

</div>

<div class="Content-Main">

  <div id="List-Main">

    <input type="text" id="List-Search" placeholder="Type here to search...">

    <div id="Loading-Table">
      <img src="../../../img/Loading/Loading.gif" alt="Loading-Gif" height="80" width="80">
    </div>

    <table id="List" class="stripe">
      <thead>
          <tr>
              <th>Class</th>
              <th>Year</th>
          </tr>
      </thead>
      <tbody>

        <?php

        // Add DB config
        require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

        // Add DocResponse
        require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/DocResponse.php');

        // MySQLi statement
        $QueryGetClasses = 'SELECT classes.id, classes.vgs, programs.code, classes.separator, years.title
        FROM classes
        INNER JOIN programs ON classes.program_id = programs.id
        INNER JOIN years ON classes.year_id = years.id
        ORDER BY years.title';

        if (!($stmt = $conn->prepare($QueryGetClasses))) {
            DocResponse("Error", "", "Prepareing statement");
            exit();
        }

        if (!$stmt->execute()) {
            DocResponse("Error", "", "Executing statement");
            exit();
        }

        $stmt->store_result();

        $stmt->bind_result($Id, $Vgs, $Code, $Separator, $Title);

        $ResultClasses;

        if ($stmt->num_rows !== 0) {
          while ($row = $stmt->fetch()) {


              ?>

              <tr data-id="<?php echo $Id; ?>">
                <td><?php echo $Vgs . $Code . $Separator; ?></td>
                <td><?php echo $Title; ?></td>
              </tr>

              <?php

          }


        }

        // Close prepared statement
        $stmt->close();


         ?>

      </tbody>
    </table>
  </div>
</div>


<!-- Add class to DB using AJAX -->
<div id="AddClassModal" class="modal">

  <input type="hidden" id="AddClass-Id" value="">

  <div class="Modal-Header">
    <label>Add new class</label>
    <a rel="modal:close">x</a>
  </div>

  <form class="Modal-Form">

    <div class="Form-First">
      <div class="AddClass-Container">
          <label>VGS</label>

        <div id="AddClass-Vgs"></div>
      </div>

      <div class="AddClass-Container">
        <label>Separator</label>

      <input type="text" id="AddClass-Separator" maxlength="1" placeholder="A/B/C/D" required>
      </div>
    </div>

    <div class="Form-Program">
      <label>Program:</label>

      <div id="AddClass-Program"></div>
    </div>

    <div class="Form-Year">
      <label>Year:</label>

      <div id="AddClass-Year"></div>
    </div>

  </form>

  <div class="Modal-Buttons">
    <a class="button" id="AddClass-Add">Add class</a>
  </div>

</div>

<!-- Add program to DB using AJAX -->
<div id="AddProgram" class="modal">
  <input type="hidden" id="AddClass-Id" value="">

  <div class="Modal-Header">
    <label>Add new program</label>
    <a rel="modal:close">x</a>
  </div>


  <div class="Modal-Form">
    <div class="AddProgram-Program">
      <label>Program:</label>
      <input type="text" id="AddProgram-Program" placeholder="Title of program">
    </div>
    <div class="AddProgram-Code">
      <label>Code:</label>
      <input type="text" id="AddProgram-Code" placeholder="Short code for program">
    </div>
  </div>

  <div class="Modal-Buttons">
    <a class="button" id="AddProgram-Add">Add program</a>
  </div>
</div>
