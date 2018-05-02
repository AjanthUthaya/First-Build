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
      <span class="Title-Program"></span>
      <span class="Title-CodeYear"></span>
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
        <a id="Filter-Clear"><span class="fa fa-refresh"></span>Clear</a>
        <div class="ManageClass-Filter-Main">

          <!-- Accordion for filter section -->
          <ul class="accordion" data-accordion data-multi-expand="true" data-allow-all-closed="true">
            <!-- Add is-active to li as a class, to make the item open on default -->

            <li class="accordion-item is-active" data-accordion-item>
              <a class="accordion-title">General</a>
              <div class="accordion-content General-Section" data-tab-content>

                <div class="General-Section-Separate">
                  <div class="General-Section-Order">
                    <label>Order</label>
                    <a class="button" id="General-Order">ASC</a>
                  </div>


                  <div class="General-Section-Limit">
                    <label class="General-Limit-Label">Limit</label>
                    <select id="General-Limit">
                    </select>
                  </div>
                </div>

                <div class="General-Section-Grade">
                  <label class="General-Grade-Label">Grade/s</label>
                  <select id="General-Grade">
                  </select>
                  <div class="General-Grade-Selected">

                  </div>
                </div>

              </div>
            </li>


            <li class="accordion-item is-active" data-accordion-item>
              <!-- USER TYPE -->
              <a class="accordion-title">User Type</a>
              <div class="accordion-content" data-tab-content>

                <!-- User_Type = Student -->
                <div class="Filter-Checkbox">
                  <input type="checkbox" id="User_Type-Admin">

                  <label class="Filter-Checkbox-Label Filter-User_Type" for="User_Type-Admin">
                    <span class="Filter-Checkbox-Box"></span>
                    Admin
                  </label>
                </div>

                <div class="Filter-Checkbox">
                  <input type="checkbox" id="User_Type-Teacher">

                  <label class="Filter-Checkbox-Label Filter-User_Type" for="User_Type-Teacher">
                    <span class="Filter-Checkbox-Box"></span>
                    Teacher
                  </label>
                </div>

                <div class="Filter-Checkbox">
                  <input type="checkbox" id="User_Type-Student">

                  <label class="Filter-Checkbox-Label Filter-User_Type" for="User_Type-Student">
                    <span class="Filter-Checkbox-Box"></span>
                    Student
                  </label>
                </div>

              </div>
            </li>

          </ul>


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



        </ul>
      </div>
    </div>
  </div>


  <!-- Footer or buttons area -->
  <div class="Modal-Buttons">
    <button class="button" id="ManageClass-Save">Save</button>
  </div>
</div>
