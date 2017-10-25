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

// NOTE: Stops body from scrolling when OffCanvas menu is open

// Makes internal links scroll smooth
$(document).ready(function() {
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function() {
      window.location.hash = target;
    });
  });
});

// Code for image slider
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("is-active", "");
  }
  x[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " is-active";
}
