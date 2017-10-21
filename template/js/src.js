$(document).ready(() => {
  $(".button-collapse").sideNav({
    draggable: true,
  });
  $('.slider').slider({
    full_width: true
  });
   $('.dropdown-button').dropdown({
     hover: true,
     belowOrigin: true,
   });
  $('.parallax').parallax();
  $('#edit-profile').modal();
  $('#modal2').modal();
  $('select').material_select();
});
