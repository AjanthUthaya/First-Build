<?php

function CreateThumbnail($File, $Path, $NewHeight) {

  switch(pathinfo($File['name'], PATHINFO_EXTENSION)){
    case "jpg":
    case "jpeg":
    $Ext = 'jpeg';
    // Copy image
    $Img = ImageCreateFromJPEG($File['tmp_name']);
    break;

    case "png":
    $Ext = 'png';
    // Copy image
    $Img = ImageCreateFromPNG($File['tmp_name']);
    break;

    default:
    $Response = array(
      'Status' => 'Failed',
      'Title' => 'Image ext',
      'Message' => 'Invalid image extension, only jpg, jpeg or png'
    );
    return $Response;
    break;
  }

  // Get height and width of original image
  $width = ImageSx($Img);
  $height = ImageSy($Img);

  // Set new height and width
  $n_width = $NewHeight;
  $n_height = $NewHeight;


  // Set new width that maintains the aspect ratio of the old image
  $n_width = ($n_height / $height) * $width;

  // Set canvas size
  $newimage = imagecreatetruecolor($n_width, $n_height);


  // Make the background transparent
  $transparent = imagecolorallocate($newimage, 0, 0, 0);
  imagecolortransparent($newimage, $transparent);


  // Resize original image
  imageCopyResized($newimage, $Img, 0, 0, 0, 0, $n_width, $n_height, $width, $height);


  // Create image and move to path (IMG, PATH + NAME.EXT)
  if (pathinfo($File['name'], PATHINFO_EXTENSION) == 'jpeg' || pathinfo($File['name'], PATHINFO_EXTENSION) == 'jpg') {
    ImageJpeg($newimage, $Path);
  } elseif (pathinfo($File['name'], PATHINFO_EXTENSION) == 'png') {
    ImagePNG($newimage, $Path);
  }

  $Response = array(
    'Status' => 'Done',
    'Title' => 'Passed by all params',
    'Message' => 'Message for done'
  );

  return $Response;
}
