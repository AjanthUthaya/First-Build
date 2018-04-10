function init() {

  // Change header based on color
  $('#EditMajor-Color').on('change', function(event) {
    var ColorSelector = $(this).val();

    $('.Title-Main').css('background', ColorSelector);
  });

}
