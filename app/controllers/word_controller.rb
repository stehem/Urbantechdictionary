class WordController < ApplicationController

respond_to :json


def index
  words = Word.select('word, id').where('word ~* ?', '^' + params[:letter]).order('word').paginate(:all, :page => params[:page] || 1, :per_page => 10)  
  render :json => {:words => words,
                   :pagination => {:current_page => words.current_page,
                                    :per_page => words.per_page,
                                    :total_entries => words.total_entries,
                                    :next_page => words.next_page,
                                    :previous_page => words.previous_page}
                   }		                                 
end


def show
  word = Word.find(params[:id])
  defs = word.definitions.select('id, definition, upv, dwv, poster').order('upv DESC').paginate(:all, :page => params[:page] || 1, :per_page => 10)
  #words = Word.select('word, id').where('word ~* ?', '^' + word.word[0,1])
  render :json => { :word => {:word => word.word, :id => word.id},
                    :coll => defs,
                    :pagination => {:current_page => defs.current_page,
                                    :per_page => defs.per_page,
                                    :total_entries => defs.total_entries,
                                    :next_page => defs.next_page,
                                    :previous_page => defs.previous_page}#,
                    #:words => words
                   }
end


def autocomplete
  query = "%#{params[:term].strip}%"
  words = Word.where('word iLIKE ?', query).select('word')
  render :json => words.collect {|i| {"label" => i.word, "value" => i.word}}
end



end



