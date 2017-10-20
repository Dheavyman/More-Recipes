$(document).ready(() => {
  $(".button-collapse").sideNav({
    draggable: true,
  });
  $('.slider').slider({
    full_width: true
  });
  $('#modal1').modal();
  $('#modal2').modal();
  $('select').material_select();
});
