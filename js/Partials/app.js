// INIT Foundation js
$(document).foundation();

//GET MAJORS AND LOAD INTO NAV
//Get json and put it into a javascript object
var MajorList = (function() {
  var MajorList = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "data/Major.json",
    'dataType': "json",
    'success': function(data) {
      MajorList = data;
      /*alert("Done loading list of teachers");*/
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    }
  });
  return MajorList;
})();

$.each(MajorList, function(key, ma) {
  //LI element to be appended
  var MajorItem = "<li><a href=\"SubLecture.html#" + ma.major + "\" onClick=\"history.go(0)\" style=\"color: " + ma.color + ";\">" + ma.major + "</a></li>";

  //Actual appening area
  $(".Sub-Menu-List").append(MajorItem);
  //console.log(ma.color);
});
