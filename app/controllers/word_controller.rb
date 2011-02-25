class WordController < ApplicationController

respond_to :json


def index
  render :json => Word.select('word, id').where('word ~* ?', '^' + params[:letter])
end


def show
  word = Word.find(params[:id])
  defs = word.definitions.select('id, definition, upv, dwv, poster').order('created_at DESC').paginate(:all, :page => params[:page] || 1, :per_page => 10)
  render :json => { :word => {:word => word.word, :id => word.id},
                    :coll => defs,
                    :pagination => {:current_page => defs.current_page,
                                    :per_page => defs.per_page,
                                    :total_entries => defs.total_entries,
                                    :next_page => defs.next_page,
                                    :previous_page => defs.previous_page}
                   }
end


def autocomplete
  query = "%#{params[:term].strip}%"
  words = Word.where('word iLIKE ?', query).select('word')
  render :json => words.collect {|i| {"label" => i.word, "value" => i.word}}
end



end



