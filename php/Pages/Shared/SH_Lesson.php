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
     ?>

     <li class="accordion-item<?php echo ($IndexDate == '1') ? " is-active" : ""; ?>" data-accordion-item>
       <!-- Accordion tab title -->
       <a class="accordion-title"><span>( <?php echo $LessonDates['Date_Count']; ?> )</span><?php echo $LessonDates['Date_Date']; ?></a>

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

               <!-- Item top -->
               <div class="Item-Time">
                 <label class="Item-Time-Label"><?php echo $LessonData_StartDate[1] . ' - ' . $LessonData_EndDate[1] ?></label>
               </div>

               <!-- Item title -->
               <div class="Item-Title" style="background: black;">
                 <label class="Item-Title-Label"><?php echo $LessonData['title']; ?></label>
               </div>

               <!-- Item content -->
               <div class="Item-Content">
                 <ul class="Content-List">
                   <li class="Content-List-Item"><span class="fa fa-users"></span><label><?php echo $LessonData['ava'] . ' / ' . $LessonData['ava_max']; ?></label></li>
                   <li class="Content-List-Item"><span class="fa fa-building"></span><label><?php echo $LessonData['room'] ?></label></li>
                 </ul>
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
