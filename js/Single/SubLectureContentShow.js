//Function for finding value inside objects
// NOTE: findObjectByKey(MajorList, 'major', Major);
function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}

//Function for finding multiple value inside objects
// NOTE: var results = findObjectsByKey(SubList, {major: ma.id});
function findObjectsByKey(set, properties) {
  return set.filter(function(entry) {
    return Object.keys(properties).every(function(key) {
      return entry[key] === properties[key];
    });
  });
}


//SubLecture.html
var Major = window.location.hash.substr(1);

//JSON OBJECT contains all deatails about major
var ma = findObjectByKey(MajorList, 'major', Major);
if (ma == null) {

  $("#Content-Main").append('<div class="Major-Null">THIS MAJOR DOES NOT EXIST( ' + Major + ' )</div>');

} else {
  //Display Content dynamically based on #URL
  //Make this menu a accordion for tema and sub-tema, link: https://foundation.zurb.com/sites/docs/accordion.html
  //Major Title
  var Major_Title = '<div class="Sub-Major-Title Major-Title-Main" style="background-color: ' + ma.color + ';">' + ma.major + '</div>';

  //Get json and put it into a javascript object
  var SubList = (function() {
    var SubList = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "data/Sub.json",
      'dataType': "json",
      'success': function(data) {
        SubList = data;
        /*alert("Done loading list of teachers");*/
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
      }
    });
    return SubList;
  })();

  //See if any subs matches this major
  var subs = findObjectsByKey(SubList, {
    major: ma.id
  });

  var ChapterList = (function() {
    var ChapterList = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "data/Chapter.json",
      'dataType': "json",
      'success': function(data) {
        ChapterList = data;
        /*alert("Done loading list of teachers");*/
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
      }
    });
    return ChapterList;
  })();


  var accordion_item = [];

  $.each(subs, function(index, value) {
    //Side List
    //Folder
    var accordion_title = '<a class="accordion-title"><span data-tooltip aria-haspopup="true" class="has-tip" data-disable-hover="false" tabindex="1" title="' + value.details + '">' + value.sub + '</span></a>';

    //Item/s inside folder
    // NOTE: Get every item that matches sub and major id


    //See if any subs matches this major
    var chapter = findObjectsByKey(ChapterList, {
      major: ma.id,
      sub: value.id
    });

    var ChapterLI = [];

    $.each(chapter, function(index, value) {
      var Acc_Item = '<li><a data-id-name="' + value.id + '">' + value.chapter + '</a></li>';
      ChapterLI.push(Acc_Item);
    });


    var accordion_content = '<div class="accordion-content" data-tab-content><ul class="vertical menu align-center Chapter-List">' + ChapterLI.join("") + '</ul></div>';
    accordion_item.push('<li class="accordion-item" data-accordion-item>' + accordion_title + accordion_content + '</li>');
    return ChapterLI;
  });

  var ChapterFirst = findObjectsByKey(ChapterList, {
    major: ma.id,
    sub: subs[0].id
  });
  //console.log(test[0]);
  //console.log(ChapterList[0].chapter);


  //Content For Accordion link
  if (ChapterFirst[0] !== undefined) {
    var Link_Content_Title = '<div class="Content-Main-Title">' + ChapterFirst[0].chapter + '</div>';
    var Link_Content_Content = '<div class="Content-Main-Content">' + ChapterFirst[0].details + '</div>';
  } else {
    var Link_Content_Title = '<div class="Content-Main-Title">No content</div>';
    var Link_Content_Content = '<div class="Content-Main-Content"></div>';
  }

  var Accordion_Link_Content = '<div class="medium-9 Sub-Major-Content-Main">' + Link_Content_Title + Link_Content_Content + '</div>';

  //ACCORDION LIST
  var AccordionList = '<ul class="accordion" data-accordion data-allow-all-closed="true">' + accordion_item.join("") + '</ul>';

  //Content Main
  var Sub_Major_Content = '<div class="grid-x Sub-Major-Content"><div class="medium-3 Sub-Major-Menu-Main">' + AccordionList + '</div>' + Accordion_Link_Content + '</div>';

  //Main
  var Data_Major_Main = '<data id="Major-Engelsk">' + Major_Title + Sub_Major_Content + '</data>';

  $("#Content-Main").append(Data_Major_Main);

  // NOTE: This fixes issue adding accordion dynamically
  $(document).foundation();

  //Changes Content on click
  $(document).on('click', '.accordion li a', function() {

    Html = $(this)[0];
    if (Html.hasAttribute("data-id-name") == true) {

      var filterName = $(this).data('id-name');

      var ChapterItem = ChapterList[filterName - 1];

      $(".Content-Main-Title").text(ChapterItem.chapter);
      $(".Content-Main-Content").text(ChapterItem.details);

    }

  });
}
