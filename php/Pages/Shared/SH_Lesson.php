<div class="Lesson-Title-Main">

  <div class="Lesson-Title-Left"></div>
  <div class="Lesson-Title-Title"><span>Lessons</span></div>
  <a class="Lesson-Title-Right button" href="<?php echo $URI_NewLesson ?>">Add/Edit</a>

</div>


<div class="Lesson-Content-Main">
  <ul class="accordion" data-accordion data-multi-expand="true" data-allow-all-closed="true">

    <?php
        // DB config file
        require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

        // MySQLi statement
        $QueryGrouped = "SELECT SUBSTRING_INDEX(start_date, ' ', 1) AS Date_Date, COUNT(id) AS Date_Count
          FROM lessons
          WHERE UNIX_TIMESTAMP(STR_TO_DATE(start_date, '%d-%m-%Y')) >= UNIX_TIMESTAMP(UTC_DATE())
          GROUP BY SUBSTRING_INDEX(start_date, ' ', 1)
          ORDER BY STR_TO_DATE(start_date, '%d-%m-%Y') ASC";

        // Connect and run query
        $ResultGrouped = $conn->query($QueryGrouped);

        if ($ResultGrouped->num_rows > 0) {

          // Store result in array
        while ($ResultGrouped_Item = $ResultGrouped->fetch_assoc()) {
            $ResultGrouped_Array[] = $ResultGrouped_Item;
        }


        // MySQLi statement
        $QueryLesson = "SELECT *
          FROM lessons
          WHERE UNIX_TIMESTAMP(STR_TO_DATE(start_date, '%d-%m-%Y')) >= UNIX_TIMESTAMP(UTC_DATE())
          ORDER BY STR_TO_DATE(start_date, '%d-%m-%Y') ASC";

        // Connect and run query
        $ResultLesson = $conn->query($QueryLesson);

          // Store result in array
        while ($ResultLesson_Item = $ResultLesson->fetch_assoc()) {
            $ResultLesson_Array[] = $ResultLesson_Item;
        }

        // Close connection
        $conn->close();

        // Index to make first item/date open
        $IndexDate = 0;

        foreach ($ResultGrouped_Array as $LessonDates) {
          $IndexDate++;

          $old_date = $LessonDates['Date_Date']; // returns Saturday, January 30 10 02:06:34
          $old_date_timestamp = strtotime($old_date);
          $new_date = date('D d.M.y', $old_date_timestamp);
     ?>

     <li class="accordion-item<?php echo ($IndexDate == '1') ? " is-active" : ""; ?>" data-accordion-item>
       <!-- Accordion tab title -->
       <a class="accordion-title"><span>( <?php echo $LessonDates['Date_Count']; ?> )</span><?php echo $new_date; ?></a>

       <!-- Accordion content -->
       <div class="accordion-content" data-tab-content>
         <div class="Accordion-Content-Main grid-x small-up-1 medium-up-4 large-up-3">


           <?php foreach ($ResultLesson_Array as $LessonData) {
              $LessonDates_Date = $LessonDates['Date_Date'];
              $LessonData_StartDate = explode(" ", $LessonData['start_date']);
              $LessonData_EndDate = explode(" ", $LessonData['end_date']);

              if ($LessonDates_Date == $LessonData_StartDate[0]) {
              ?>

           <!-- Accordion item -->
           <div class="Accordion-Item-Main cell">
             <div class="Accordion-Item">

               <!-- Item - Title -->
               <div class="Item-Title" style="background: <?php echo $LessonData['color']; ?>;">
                 <label class="Item-Title-Label"><?php echo $LessonData['title']; ?></label>
               </div>

               <!-- Item - Sub -->
               <div class="Item-Sub">
                 <label class="Item-Sub-Label"><?php echo $LessonData['sub']; ?></label>
               </div>


               <!-- Item - List -->
               <div class="Item-Content">
                 <ul class="Item-List">
                   <li class="List-Item List-Item-Teacher"><span class="Item-Icon fa fa-user"></span><label class="Item-Label">Not implemented</label></li>
                   <li class="List-Item List-Item-Ava"><span class="Item-Icon fa fa-users"></span><label class="Item-Label">Not implemented</label></li>
                   <li class="List-Item List-Item-Room"><span class="Item-Icon fa fa-building"></span><label class="Item-Label"><?php echo $LessonData['room']; ?></label></li>
                 </ul>
               </div>

               <!-- Item - Time -->
               <div class="Item-Time">
                 <label class="Item-Time-Label"><?php echo $LessonData_StartDate[1]; ?> - <?php echo $LessonData_EndDate[1]; ?></label>
               </div>

             </div>
           </div>

           <?php } } ?>


         </div>
       </div>



     </li>

   <?php }
   // If no results
   } else { ?>

     <div class="Lesson-No-Events">
       <label>No upcoming events</label>
     </div>

    <?php } ?>

  </ul>

</div>
