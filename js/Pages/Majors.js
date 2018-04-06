function init() {

  // Toggle search bar
  $('.Major-Title-Left').on('click', function(event) {
    // Show search bar
    $('.Major-Search-Main').toggleClass('Major-Search-Show');

    // Focus on input
    $("#Search-Major").focus();

  });

  // Runs search engine
  $("#Search-Major").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".Major-List .Major-Item").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  // Captalize first letter of input (username is not case sensitive, but password is)
  $('#Search-Major').on('keydown', function(event) {
    if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
      var $t = $(this);
      event.preventDefault();
      var char = String.fromCharCode(event.keyCode);
      $t.val(char + $t.val().slice(this.selectionEnd));
      this.setSelectionRange(1, 1);
    }
  });

  // On Item click
  $(".Major-Item").on("click", function(e) {
    var Major_Id = $(e.target).data('major_id');

    console.log(Major_Id);
  });

  $("#AddMajor").on("click", function(e) {
    $("#AddMajor-Modal").modal({
      fadeDuration: 250,
      fadeDelay: 0.50
    });
  });

}
