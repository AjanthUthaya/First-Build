var Major = window.location.hash.substr(1);
var DefaultSubMajor = '#' + 'Intro';

$(document).ready(function() {
  var DisplayMajor = $("#Major-" + Major).css("display", "block");
  var DisplaySubMajor = $(DefaultSubMajor).css("display", "block");
});

//Changes Content on click
$(document).on('click', '.Accord-List li a', function() {
  var filterName = $(this).data('id-name');

  var Id = '#' + filterName;
  var Class = '.Sub-Major-Content-Main';

  if ($(Id).length) {
    $(Class).css("display", "none");
    $(Id).css("display", "block");
  } else {

  }
});
