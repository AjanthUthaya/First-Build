<?php
// Declaring filename
$File = explode('.', basename($_SERVER['SCRIPT_FILENAME']));
$Filename = $File[0];
$FileExt = $File[1];
$FilenameSplit = preg_split('/(?=[A-Z])/', $Filename);
$FilenameFull = implode(" ", array_filter($FilenameSplit));
?>



<title><?php echo $FilenameFull ?> - First Build</title>
