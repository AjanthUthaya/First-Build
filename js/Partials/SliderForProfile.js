$ProfileButton = ".Profile";
$NotifiButton = ".Notifi";




$($ProfileButton).click(function() {
  $MainDiv = $(".Slider > div");
  $MainDivLenght = $MainDiv.length;

  $Main = $MainDiv.slice(0, 1).attr("class");
  $MainDot = "." + $MainDiv.slice(0, 1).attr("class");
  //console.log("." + $Main);

  $Profile = $MainDiv.slice(1, 2).attr("class");
  $ProfileDot = "." + $MainDiv.slice(1, 2).attr("class");
  //console.log("." + $Profile);

  $Notifi = $MainDiv.slice(2, 3).attr("class");
  $NotifiDot = "." + $MainDiv.slice(2, 3).attr("class");
  //console.log("." + $Notifi);

  //console.log("Profile button clicked");
  TabValue = $(this).attr("data-TabValue");

  if (TabValue == "view") {

    //console.log("TabValue = " + TabValue);


    $($NotifiDot).css("display", "none");
    $($ProfileDot).css("display", "block");

    setTimeout(function() {
      $($ProfileDot).css({
        transition: "transform 0.4s ease-in-out",
        transform: "translateX(-300px)"
      });
      $($MainDot).css({
        transition: "transform 0.4s ease-in-out",
        transform: "translateX(-300px)"
      });
    }, 450);


  } else if (TabValue == "back") {

    //console.log("TabValue = " + TabValue);
    $($NotifiDot).css("display", "none");
    $($ProfileDot).css({
      transform: "translateX(0px)"
    });
    $($MainDot).css({
      transform: "translateX(0px)"
    });

    setTimeout(function() {
      $($ProfileDot).css("display", "none");
    }, 450);
  }

});




$($NotifiButton).click(function() {

  $MainDiv = $(".Slider > div");
  $MainDivLenght = $MainDiv.length;
  $Main = $MainDiv.slice(0, 1).attr("class");
  $MainDot = "." + $MainDiv.slice(0, 1).attr("class");
  $Profile = $MainDiv.slice(1, 2).attr("class");
  $ProfileDot = "." + $MainDiv.slice(1, 2).attr("class");
  $Notifi = $MainDiv.slice(2, 3).attr("class");
  $NotifiDot = "." + $MainDiv.slice(2, 3).attr("class");


  TabValue = $(this).attr("data-TabValue");
  TabValue = $(this).attr("data-TabValue");


  if (TabValue == "view") {

    //console.log("TabValue = " + TabValue);
    $($ProfileDot).css("display", "none");
    $($NotifiDot).css("display", "block");


    setTimeout(function() {
      $($NotifiDot).css({
        transition: "transform 0.4s ease-in-out",
        transform: "translateX(-300px)"
      });
      $($MainDot).css({
        transition: "transform 0.4s ease-in-out",
        transform: "translateX(-300px)"
      });
    }, 450);


  } else if (TabValue == "back") {

    //console.log("TabValue = " + TabValue);
    $($ProfileDot).css("display", "none");
    $($NotifiDot).css({
      transform: "translateX(0px)"
    });
    $($MainDot).css({
      transform: "translateX(0px)"
    });

    setTimeout(function() {
      $($NotifiDot).css("display", "none");
    }, 450);

  }

});
