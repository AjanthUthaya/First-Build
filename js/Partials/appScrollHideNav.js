// Top bar scroll to hide
// NOTE: Add script that adds margin to content when bar is showing
var prev = 0;
var $window = $(window);
var nav = $('.scrollhide-nav');

$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y > 400) {
    var scrollTop = $window.scrollTop();
    nav.toggleClass('hidden', scrollTop > prev);
    prev = scrollTop;
    //document.getElementById("Test-Content").style.marginTop = '0px';
  } else if (y < 400) {
    nav.toggleClass('hidden', scrollTop < prev);
  } else {
    //document.getElementById("Test-Content").style.marginTop = '80px';
  }


});
