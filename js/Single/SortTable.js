// INIT DataTable js
$(document).ready(function() {
  $('.Absence-Table').DataTable({
    "paging": false,
    "info": false,
    "searching": false,
    "order": [
      [0, "asc"]
    ]
  });
});
