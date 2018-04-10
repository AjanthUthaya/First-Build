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
              <th>Name</th>
              <th>Position</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
          </tr>
          <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
          </tr>
          <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
          </tr>
          <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
          </tr>
          <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
          </tr>
          <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
          </tr>
          <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
          </tr>
          <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
          </tr>
          <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
          </tr>
        </tbody>
    </table>

  </div>

</div>


<!-- Delete room from DB using AJAX -->
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

      <input type="text" id="AddClass-Separator" maxlength="1" required>
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
