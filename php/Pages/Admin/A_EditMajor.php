<div class="Title-Main">

  <a href="<?php echo $URI_Majors ?>" class="Title-Left fa fa-arrow-left"></a>

  <div class="Title-Title"><span>Edit Major</span></div>

</div>

<div class="EditMajor-Content">
  <div class="EditMajor-Section-Title">

    <div class="Section-Sub Sub-Title">
      <label>Major</label>
      <input type="text" placeholder="Eks. Engelsk" id="EditMajor-Major">
    </div>

    <div class="Section-Sub Sub-Title">
      <label>Code</label>
      <input type="text" placeholder="Eks. 2ENG" id="EditMajor-Code">
    </div>

  </div>


  <div class="EditMajor-Section-Meta">

    <div class="Section-Sub Sub-Meta">
      <label>VGS</label>
      <select id="EditMajor-Vgs">
        <option value="" selected disabled>Replace with ddslick for multiselect</option>
      </select>
    </div>

    <div class="Section-Sub Sub-Meta">
      <label>Color</label>
      <input type="color" value="#35414d" id="EditMajor-Color">
    </div>

    <div class="Section-Sub Sub-Meta">
      <label>Hour</label>
      <input type="number" placeholder="Eks. 148" id="EditMajor-Hours">
    </div>

  </div>


  <div class="EditMajor-Section-List">

    <div class="Section-List">
      <label>Teacher List</label>
      <div class="List-Box" id="EditMajor-List-Teacher">
        <span class="fa fa-user List-Box-Icon"></span>
        <span id="List-Box-Teacher">28</span>
      </div>
    </div>

    <div class="Section-List">
      <label>Student List</label>
      <div class="List-Box" id="EditMajor-List-Stundent">
        <span class="fa fa-users List-Box-Icon"></span>
        <span id="List-Box-Stundent">28</span>
      </div>
    </div>

  </div>

  <div class="EditMajor-Section-Save">

    <a class="button" id="EditMajor-Save">Save</a>

  </div>
</div>
