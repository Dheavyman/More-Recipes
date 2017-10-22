$(document).ready(() => {
  $(".button-collapse").sideNav({
    draggable: true,
  });
  $('.slider').slider({
    full_width: true,
  });
  $('.dropdown-button').dropdown({
     hover: true,
     belowOrigin: true,
   });
  $('.parallax').parallax();
  $('.collapsible').collapsible();
  $('.modal').modal();
  $('select').material_select();
});
