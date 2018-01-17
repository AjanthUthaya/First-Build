/*function HideOrShow() {
  if (document.getElementById("Item-One").style.display = "visible") {
    document.getElementById("Item-One").style.display = "visible";
    console.log("True");
  } else {
    document.getElementById("Item-One").style.display = "hidden";
    console.log("False(Else)");
  }

}
HideOrShow();
*/

//This works for two divs with static ID names
/*$("#Item-One").css("display", "block");
$("#Item-Two").css("display", "none");
window.setInterval(function() {
  var display = $("#Item-One").css("display");
  if (display != "block") {
    $("#Item-One").fadeIn(150);
    $("#Item-Two").fadeOut(150);
  } else {
    $("#Item-One").fadeOut(150);
    $("#Item-Two").fadeIn(150);
  }
  //1000 = 1 sec
}, 15000);*/


//Working on a dynamic version
var IdName = "Absence-Major";
var list = document.getElementsByClassName("Absence-Item");
for (var i = 0; i < list.length; i++) {
  list[i].setAttribute("id", IdName + i);
}
$("#" + IdName + "0").fadeIn(FadeInSpeed);


var SetIntervalSpeed = 15 * 1000; // In milliseconds
var FadeOutSpeed = 200; // In milliseconds
var FadeInSpeed = 200; // In milliseconds
var i = 1; // The index of the current item to show
setInterval(function() { // setInterval makes it run repeatedly
  $("#" + IdName + (i - 1)).fadeOut(FadeOutSpeed); // Fade out last item, so it doesn't get stuck on display: block
  $("#" + IdName + i++).fadeIn(FadeInSpeed); // Get the item and increment

  if (i == list.length) {
    i = 0; // Reset to first element if you've reached the end
  } else {
    $("#" + IdName + (list.length - 1)).fadeOut(FadeOutSpeed);
  };
}, SetIntervalSpeed);
