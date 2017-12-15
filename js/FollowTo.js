$IdDataList = '#DataList';
$IdOptionPanel = '#OptionMain';
$ClassInside = 'Inside';
$ClassOutside = 'Outside';
$ClassInsideDot = '.Inside';
$ClassOutsideDot = '.Outside';
$($IdOptionPanel).addClass($ClassInside);

//Glitching beacuse offset returns double value, glitch shows up on screen size under 900px
$(document).scroll(function() {


  //Get height of Calendar height element
  $CalHeight = $($IdDataList).height();
  //Get position of options panel
  $OptPOS = $($IdOptionPanel).offset();

  $WindowBottomPOS = $(window).height() + $(window).scrollTop();

  //Get bottom position of window
  /*console.log('Position:' + $WindowBottomPOS);*/

  //Change between to classes depening on position of option panel
  if ($CalHeight > $OptPOS.top || $CalHeight > $WindowBottomPOS - 110) {

    $($IdOptionPanel).addClass($ClassInside);
    $($IdOptionPanel).removeClass($ClassOutside);

  } else {

    $($IdOptionPanel).addClass($ClassOutside);
    $($IdOptionPanel).removeClass($ClassInside);

  }


});
