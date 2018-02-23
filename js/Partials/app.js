// INIT Foundation js
$(document).foundation();

// PHP Require/Include function
function require(script) {
  $.ajax({
    url: script,
    dataType: "script",
    async: false,
    success: function() {},
    error: function() {
      throw new Error("Could not load script " + script);
    }
  });
}
