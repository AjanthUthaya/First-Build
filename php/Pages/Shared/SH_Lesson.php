<div class="Lesson-Title-Main">

  <div class="Lesson-Title-Left"></div>
  <div class="Lesson-Title-Title"><span>Lessons</span></div>
  <a class="Lesson-Title-Right button" href="<?php echo $URI_NewLesson ?>">Add/Edit</a>

</div>


<div class="Lesson-Content-Main">
  <ul class="accordion" data-accordion data-multi-expand="true" data-allow-all-closed="true">


    <?php

      // DB config
      require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

      // MySQLi statement
      $Query = "SELECT SUBSTRING_INDEX(start_date, ' ', 1) AS Date_Date, COUNT(id) AS Date_Count
                FROM lessons
                WHERE UNIX_TIMESTAMP(STR_TO_DATE(start_date, '%d-%m-%Y')) >= UNIX_TIMESTAMP(UTC_DATE())
                GROUP BY SUBSTRING_INDEX(start_date, ' ', 1)
                ORDER BY STR_TO_DATE(start_date, '%d-%m-%Y') ASC";

      // Connect and run query
      $Result = $conn->query($Query);

      // While query is running get results
      while ($Result_Item = $Result->fetch_array()) {
          $Result_Array[] = $Result_Item;
      }



      $QueryLesson = "SELECT * FROM lessons ORDER BY STR_TO_DATE(start_date, '%d-%m-%Y') ASC";

      // Connect and run query
      $ResultLesson = $conn->query($QueryLesson);

      // While query is running get results
      while ($Result_Item_Lesson = $ResultLesson->fetch_array()) {
          $Result_Lesson_Array[] = $Result_Item_Lesson;
      }

      // Close connection
      $conn->close();

      $ItemIndex = 0;

      foreach ($Result_Array as $Item) {
          $ItemIndex++;

          $old_date = $Item['Date_Date'];
          $old_date_timestamp = strtotime($old_date);
          $new_date = date('D d.M.Y', $old_date_timestamp); ?>

     <li class="accordion-item <?php if ($ItemIndex == 1) { echo 'is-active'; } ?>" data-accordion-item>
       <!-- Accordion tab title -->
       <a class="accordion-title"><span>(<?php echo $Item['Date_Count'] ?>)</span><?php echo $new_date ?></a>

       <!-- Accordion content -->
       <div class="accordion-content" data-tab-content>
         <div class="Accordion-Content-Main grid-x small-up-1 medium-up-4 large-up-3">


           <?php foreach ($Result_Lesson_Array as $Item_Lesson) {
             $Start = explode(" ", $Item_Lesson['start_date']);
             $End = explode(" ", $Item_Lesson['end_date']);

             if ($Item['Date_Date'] == $End[0]) {
              ?>


           <!-- Accordion item -->
           <div class="Accordion-Item-Main cell">
             <div class="Accordion-Item">

               <!-- Item top -->
               <div class="Item-Time">
                 <label class="Item-Time-Label"><?php echo $Start[1] . ' - ' . $End[1]; ?></label>
               </div>

               <!-- Item title -->
               <div class="Item-Title" style="background: <?php echo $Item_Lesson['color']; ?>;">
                 <label class="Item-Title-Label"><?php echo $Item_Lesson['title']; ?></label>
               </div>

               <!-- Item content -->
               <div class="Item-Content">
                 <ul class="Content-List">
                   <li class="Content-List-Item"><span class="fa fa-users"></span><label><?php echo $Item_Lesson['ava']; ?> / <?php echo $Item_Lesson['ava_max']; ?></label></li>
                   <li class="Content-List-Item"><span class="fa fa-building"></span><label><?php echo $Item_Lesson['room']; ?></label></li>
                 </ul>
               </div>

             </div>
           </div>

           <?php } } ?>


         </div>
       </div>

     </li>

   <?php } ?>


  </ul>
</div>
