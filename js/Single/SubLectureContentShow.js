//Function for finding value inside objects
function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}


//SubLecture.html
var Major = window.location.hash.substr(1);
var DefaultSubMajor = '#' + 'Intro';

//JSON OBJECT contains all deatails about major
var ma = findObjectByKey(MajorList, 'major', Major);
if (ma == null) {

  $("#Content-Main").append('<div class="Major-Null">THIS MAJOR DOES NOT EXIST( ' + Major + ' )</div>');
  
} else {

  $(document).ready(function() {
    //Displays deafault sub content
    var DisplaySubMajor = $(DefaultSubMajor).css("display", "block");
  });

  //Display Content dynamically based on #URL
  //Make this menu a accordion for tema and sub-tema, link: https://foundation.zurb.com/sites/docs/accordion.html
  //Major Title
  var Major_Title = '<div class="Sub-Major-Title Major-Title-Main" style="background-color: ' + ma.color + ';">' + ma.major + '</div>';

  //Side List
  var accordion_title = '<a class="accordion-title">Energi</a>';
  var Acc_Item = '<li><a data-id-name="Intro">Intro</a></li><li><a>Placeholder 1</a></li><li><a>Placeholder 2</a></li>';
  var accordion_content = '<div class="accordion-content" data-tab-content><ul class="vertical menu align-center Chapter-List">' + Acc_Item + '</ul></div>';
  var accordion_item = '<li class="accordion-item is-active" data-accordion-item>' + accordion_title + accordion_content + '</li>';

  //Content For Accordion link
  var Link_Content_Title = '<div class="Content-Main-Title">Radioaktivitet</div>';
  var Link_Content_Content = '<div class="Content-Main-Content">Lorem text goes here</div>';
  var Accordion_Link_Content = '<div class="medium-9 Sub-Major-Content-Main" id="Intro">' + Link_Content_Title + Link_Content_Content + '</div>';

  var AccordionList = '<ul class="accordion" data-accordion data-allow-all-closed="true">' + accordion_item + '</ul>';

  //Content Main
  var Sub_Major_Content = '<div class="grid-x Sub-Major-Content"><div class="medium-3 Sub-Major-Menu-Main">' + AccordionList + '</div>' + Accordion_Link_Content + '</div>';

  //Main
  var Data_Major_Main = '<data id="Major-Engelsk">' + Major_Title + Sub_Major_Content + '</data>';

  $("#Content-Main").append(Data_Major_Main);

  // NOTE: This fixes issue adding accordion dynamically
  $(document).foundation();

  //Changes Content on click
  $(document).on('click', '.Accord-List li a', function() {
    var filterName = $(this).data('id-name');

    var Id = '#' + filterName;
    var Class = '.Sub-Major-Content-Main';

    /*  if ($(Id).length) {
        $(Class).css("display", "none");
        $(Id).css("display", "block");
      }*/

  });
}
