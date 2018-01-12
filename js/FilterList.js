var TeacherSearch = '.Teacher-Input';
var TeacherUl = ".dd-options";
var TeacherLi = ".dd-options li";


/*$(TeacherSearch).keyup(function() {
  var $rows = $(TeacherLi);
  var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

  $rows.show().filter(function() {
    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
    return !~text.indexOf(val);
  }).hide();
});*/

$('#box').keyup(function(){
    var valThis = $(this).val().toLowerCase();
    var noresult = 0;
    if(valThis == ""){
        $('.navList > li').show();
        noresult = 1;
	    $('.no-results-found').remove();
    } else {
        $('.navList > li').each(function(){
            var text = $(this).text().toLowerCase();
            var match = text.indexOf(valThis);
            if (match >= 0) {
                $(this).show();
                noresult = 1;
		        $('.no-results-found').remove();
            } else {
                $(this).hide();
            }
        });
   };
    if (noresult == 0) {
        $(".navList").append('<li class="no-results-found">No results found</li>');
    }
});
