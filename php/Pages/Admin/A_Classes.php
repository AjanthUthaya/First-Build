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
          <th>Full code</th>
          <th>Program</th>
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
        $QueryGetClasses = 'SELECT classes.id, programs.program, classes.vgs, programs.code, classes.separator, years.title
        FROM classes
        INNER JOIN programs ON classes.program_id = programs.id
        INNER JOIN years ON classes.year_id = years.id
        WHERE classes.id != 0
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

        $stmt->bind_result($Id, $Program, $Vgs, $Code, $Separator, $Title);

        $ResultClasses;

        if ($stmt->num_rows !== 0) {
          while ($row = $stmt->fetch()) {


            ?>

            <tr data-id="<?php echo $Id; ?>">
              <td><?php echo $Vgs . $Code . $Separator; ?></td>
              <td><?php echo $Program; ?></td>
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
  <input type="hidden" id="AddProgram-Id" value="">

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

<!-- Add program to DB using AJAX -->
<div id="AddYear" class="modal">
  <input type="hidden" id="AddYear-Id" value="">

  <div class="Modal-Header">
    <label>Add new year</label>
    <a rel="modal:close">x</a>
  </div>

  <div class="Modal-Form">

    <div class="AddYear-First">
      <label>Title</label>
      <input type="text" id="AddYear-Title" placeholder="Default: START_Year / END_Year">
    </div>

    <div class="AddYear-Second">
      <label>Start date</label>
      <input type="date" id="AddYear-Start_Date">
    </div>

    <div class="AddYear-Third">
      <label>End date</label>
      <input type="date" id="AddYear-End_Date">
    </div>

  </div>

  <div class="Modal-Buttons">
    <a class="button" id="AddYear-Add">Add year</a>
  </div>

</div>

<!-- Are you sure, confirmation before delete -->
<div id="Delete" class="modal">
  <input type="hidden" id="Delete-Id" value="">

  <div class="Modal-Header">
    <label id="Delete-Title"></label>
    <a rel="modal:close">x</a>
  </div>

  <div class="Modal-Form">

    <h3 id="Delete-Message"></h3>

  </div>

  <div class="Modal-Buttons">
    <a class="button" id="Delete-No">Cancel</a>
    <a class="alert button" id="Delete-Yes">Delete</a>
  </div>

</div>

<!-- __________ Manage class __________ -->
<div id="ManageClass" class="modal Full-Modal">
  <!-- Class id -->
  <input type="hidden" id="ManageClass-Id" value="">


  <!-- Header -->
  <div class="Modal-Header">
    <!-- Header title -->
    <label id="ManageClass-Title">
      <span class="Title-Program">Medier og kommunikasjon</span>
      <span class="Title-CodeYear">3MKA - 2018/2019</span>
    </label>

    <!-- Header close -->
    <a rel="modal:close">x</a>
  </div>


  <!-- Content -->
  <div class="Modal-Content">
    <!-- Content filter -->
    <div class="Filter-Container">
      <div class="Filter-Header">
        <span>Filter</span>
      </div>
      <div class="ManageClass-Filter">
        <input type="text" id="Filter-Search" placeholder="Search...">
        <div class="ManageClass-Filter-Main">

        </div>
      </div>
    </div>


    <!-- Content list -->
    <div class="List-Container">
      <div class="ManageClass-List">
        <div class="List-Header">
          <span>Select participants</span>
        </div>
        <ul class="ManageClass-List-Main">

          <!-- Content list item -->
          <li class="List-Item">
            <!-- List item img -->
            <div class="List-Item-Img">
              <img src="http://via.placeholder.com/100x120">
            </div>


            <!-- List item content -->
            <div class="List-Item-Content">
              <div class="Item-Content-Name">
                <span id="Item-Content-Name">Firstname Lastname</span>
              </div>

              <!--
              <div class="Item-Content-Details">
              <span id="Item-Content-Email">Firstname123@Gmail.com</span>
              <span id="Item-Content-Phone">46124938</span>
            </div>
          -->

        </div>


        <!-- List item checkbox -->
        <div class="List-Item-Checkbox">
          <label class="container">
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
        </div>
        <!-- List item checkbox -->
      </li>

    </ul>
  </div>
</div>
</div>


<!-- Footer or buttons area -->
<div class="Modal-Buttons">
  <a class="button" id="ManageClass-Save">Save</a>
</div>
</div>
