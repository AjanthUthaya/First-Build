var Major = window.location.hash.substr(1);
$( document ).ready(function() {
    $("#Major-" + Major).css("display", "block");
});
