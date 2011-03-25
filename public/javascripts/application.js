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
  $('#new_def').removeClass();
  $('#words_list').removeClass();
}

function trim(w){
  if (w.length > 22)
    { return w.substring(0,20) + '...';}
  else 
    {return w;}
}

$('.downvote').click(function(e) {
    e.preventDefault();
});
