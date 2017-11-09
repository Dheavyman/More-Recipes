$(document).ready(() => {
  // Initialize materialize css side nav menu activator
  $('.button-collapse').sideNav({
    draggable: true,
  });
  // Initialize materialize dropdown class
  $('.dropdown-button').dropdown({
    hover: true,
    belowOrigin: true,
  });
  // Initialize materialize css slider class
  $('.slider').slider({
    full_width: true,
  });
  // Initialize materialize css parallax class
  $('.parallax').parallax();
  // Initialize materialize css collapsible class
  $('.collapsible').collapsible();
  // Initialize materialize css modal class
  $('.modal').modal();
  // Initialize materialize css select class
  $('select').material_select();
  // Toggle the favorite button color
  $('#favorite').click(() => {
    $('#favorite').toggleClass('red');
  });
  // Toggle the upvote button color
  $('#upvote').click(() => {
    // Make the toggling alternates between upvote and downvote
    if ($('#downvote').hasClass('red')) {
      $('#downvote').toggleClass('red');
      $('#upvote').toggleClass('red');
    } else {
      $('#upvote').toggleClass('red');
    }
  });
  // Toggle the downvote button color
  $('#downvote').click(() => {
    // Make the toggling alternates between upvote and downvote
    if ($('#upvote').hasClass('red')) {
      $('#upvote').toggleClass('red');
      $('#downvote').toggleClass('red');
    } else {
      $('#downvote').toggleClass('red');
    }
  });
});
