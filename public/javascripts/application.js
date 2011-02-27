function autocomp(){
  $("input#def_word").autocomplete({
  source: "/autocomplete",
  minLength:3, 
  delay: 250
  });
}

function empty_stuff(){
  $('#main div').empty();
  $('#main ul').empty();
  $('div[id*="def_"]').remove();
}



$(function() {




});
