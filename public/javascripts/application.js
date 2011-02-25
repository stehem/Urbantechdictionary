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


var AppController = Backbone.Controller.extend({
routes : {
  "letter/:letter": "word_letter",
  "word/:id": "show_word",
  "vote/:id?v=:vtype": "vote",
  "definition/new": "new_def",
  "definition/:id": "show_def",
  "session": "logout"
  },

word_letter : function(letter) {
   empty_stuff();
   wbl = new WordStore({ url: "/word?letter="+letter });
  },

show_word: function(id) {
      $('#words_list').html('');
      empty_stuff();
      var w = $.get("word/"+id, function(data){
      var title = new TitleView({word: data.word});
      wdefs = new DefinitionStore(data.coll, {word: data.word});
      var pagination = new PaginationView({word: data.word, pagination: data.pagination});
    });
  },

new_def: function() {
    var check = $.get("/login", function(data){
    if (data.logged == "true"){
      empty_stuff();
      ndef = new NewDefView;
    }
    else if (data.logged == "false"){
      empty_stuff();
      $('#login_page').append(new EJS({url: '/javascripts/login.ejs'}).render());
    }
    });
  },

show_def: function(id) {
    empty_stuff();
    var d = $.get("definition/"+id, function(data){
      var title = new TitleView({word: data.word});
      sdef = new DefinitionStore(data.definition);
    });
  },

logout: function() {
     $.post("/logout", function (data) {
      $('#loggedas').empty().hide().html('<div>logged out</div>').fadeIn(1000).fadeOut(3000);
      });
  }

});



var Word = Backbone.Model.extend({});

var Definition = Backbone.Model.extend({
  url: function(){
    if (this.isNew()) {return 'definition'}
    else {return 'definition/'+this.id}
  },
  validate: function(attrs) {
    var result = null;
    if (attrs.upv) {postvote(attrs,"p");}
    else if (attrs.dwv) {postvote(attrs,"n");}
    else if ("word" in attrs && "definition" in attrs) {
        error = {};
        if (attrs.word == ''){error.word = "payes ton word";}
        if (attrs.definition == ''){error.definition = "payes ta def";}
        if (!_.isEmpty(error)) {return error;} 
    ;}
      function postvote(attrs,vtype){
        $.ajax({
          type: "POST",
          url: '/vote?vtype='+vtype+'&def_id='+attrs.def_id,
          async: false,
          success: function(data){
          result = data.result;
          }
        });
      }        
    if (result) {return "already voted";} 

  }
});

var Vote = Backbone.Model.extend({url: 'vote'});





var WordStore = Backbone.Collection.extend({
  model: Word,
  initialize: function(options) {
   var self = this;
   this.url = options.url;
   this.fetch({
    success: function() {
      var wview = new WordView({coll: self});
      }
   });
    }
});


var DefinitionStore = Backbone.Collection.extend({
  model: Definition,
  initialize: function(models,options) {
   this.word = options.word;
      this.each(function(def) {
      var definition = new DefinitionsView({model: def, id: "def_"+def.id, className: "each_def"});
      });
    },
});



WordView = Backbone.View.extend({
  el: $('#words_list'),
  initialize: function(options) {
  $(this.el).html('');
  this.words2render = this.options.coll;
  this.render();
    },
  render : function() {
    var self = this;
    this.words2render.each(function(word) {
    $(self.el).append(new EJS({url: '/javascripts/wordlist1.ejs'}).render(word.toJSON()));
    });
   }
});



TitleView = Backbone.View.extend({
  el: $('#word_title'),
  initialize: function(options) {
  this.word = this.options.word;
  this.render();
    },
  render : function() {
  $(this.el).append(new EJS({url: '/javascripts/word.ejs'}).render({word: this.word.word}));
   }
});


DefinitionsView = Backbone.View.extend({
  events: {
    "click .upvote": "upvote",
    "click .downvote": "downvote"
  },
  upvote: function(){
    this.model.set({upv: this.model.get('upv')+1, def_id: this.model.id});
  },
  downvote: function(){
    this.model.set({dwv: this.model.get('dwv')+1, def_id: this.model.id});
  },
    initialize: function(options) {
    _.bindAll(this, 'update');
    this.model.bind('change', this.update);
          this.model.bind("error", function(model, error) {
            var selector = '#def_' + model.get('id');
            $(selector).append('<div id="error_av_'+model.get('id')+'" class="error_av">'+error+'</div>');
          });
    this.render();
      },
    render : function() {
    $(this.el).html(new EJS({url: '/javascripts/definition.ejs'}).render({definition: this.model.get('definition'), upv: this.model.get('upv'),dwv: this.model.get('dwv')}));
    $(this.el).appendTo('#definitions');
     },
    update: function(){
    $(this.el).html(new EJS({url: '/javascripts/definition.ejs'}).render({definition: this.model.get('definition'), upv: this.model.get('upv'),dwv: this.model.get('dwv')}));
     }
});


PaginationView = Backbone.View.extend({
  el: $('#pagination'),
  initialize: function(options) {
  this.pagination = this.options.pagination
  this.word = this.options.word;
  this.render();
    },
  render : function() {
  $(this.el).append(new EJS({url: '/javascripts/pagination.ejs'}).render({id: this.word.id, next_page: this.pagination.next_page, previous_page: this.pagination.previous_page}));
   }
});



NewDefView = Backbone.View.extend({
  el: $('#new_def'),
  initialize: function(options) {
    this.model = new Definition;
    this.render();
    autocomp();
    this.model.bind("error", function(model,error) {
      if (!_.isUndefined(error.word)){$('#new_def_word').append('<div>'+error.word+'</div>');}              
      if (!_.isUndefined(error.definition)){$('#new_def_def').append('<div>'+error.definition+'</div>');}              
    });
  },
  events: {
  "click #new_def_button": "submit"
     },
  submit: function(){
    this.model.save( 
        {word: $('input#def_word').val(),definition: $('textarea#def_def').val() },
        { success: function(model, response){
            window.location.href = "/#definition/"+response.id;
          } 
        }
      );   
  },
  render : function() {
  $(this.el).append(new EJS({url: '/javascripts/new_def.ejs'}).render());
   }
});





var yC = new AppController;
Backbone.history.start();


});
