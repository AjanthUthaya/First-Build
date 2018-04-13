<?php

// Includeing scripts
require($_SERVER['DOCUMENT_ROOT'] . '/php/Scripts.php');

// Declaring response array/json
$RegisterResponse = array();

function DocResponse($Status, $Title, $Message) {

  if ($Title == '') {
    $Title = $Status;
  }

  if ($Status == 'Done') {

  } elseif ($Status == 'Failed') {
  ?>
    <script type="text/javascript">
      NotifyFailed('<?php echo $Title ?>', '<?php echo $Message ?>');
    </script>
  <?php
  } elseif ($Status == 'Error') {
  ?>
    <script type="text/javascript">
      NotifyError('<?php echo $Title ?>', '<?php echo $Message ?>');
    </script>
  <?php
  } else {
  ?>
    <script type="text/javascript">
      NotifyError('JS Error', 'Status not recognized');
    </script>
  <?php
  }
}


 ?>
