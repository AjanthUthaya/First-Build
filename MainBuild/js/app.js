// INIT Foundation js
$(document).foundation()


// Top bar scroll to hide
// Commented out content, adds margin when bar is showing
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
  } else {
    //document.getElementById("Test-Content").style.marginTop = '80px';
  }
});
