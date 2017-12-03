document.addEventListener("DOMContentLoaded", function() {
  var elements = document.getElementsByTagName("INPUT"); //Change this to the tag you want to target
  for (var i = 0; i < elements.length; i++) {
    elements[i].oninvalid = function(e) {
      e.target.setCustomValidity("");
      if (!e.target.validity.valid) {
        e.target.setCustomValidity("This field cannot be left blank");
      }
    };
    elements[i].oninput = function(e) {
      e.target.setCustomValidity("");
    };
  }
})
//HTML code to set custom message
//required oninvalid="this.setCustomValidity('Put  here custom message')"
