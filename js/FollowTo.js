$(document).scroll(function() {
  var element = '.Date-Add';
  //get high parent element
  /*var height_element_parent = $("#DataList").parent().outerHeight();*/
  var height_element = $("#DataList").height() + 40; //get high of elemenet
  var Button_POS = $(element).offset();

  /*Button_css('class', 'position', 'top', 'bottom'); //(class or id, positon value, top value, bottom value)*/

  if (Button_POS.top > height_element) {
    $(element).css('position', `absolute`);
    $(element).css('top', height_element);
    $(element).css('bottom', `inherit`);
    console.log("outside" + "Button:" + Button_POS.top + " element:" + height_element);
  } else {
    $(element).css('position', `fixed`);
    $(element).css('top', `inherit`);
    $(element).css('bottom', `10px`);
    console.log("inside" + "Button:" + Button_POS.top + " element:" + height_element);
  }
});
