class DefinitionController < ApplicationController

#def show
  #definition = Definition.select('id, definition, upv, dwv').find(params[:id])
  #render :json => {:definition => definition}
#end

respond_to :json

def show
  if params[:id] == "random"
    defi = Definition.order("RANDOM()").first
  else
    defi = Definition.find(params[:id])
  end
  word = defi.word
  render :json => {:word => { :word => word.word}, :definition => {:definition => defi.definition, :upv => defi.upv, :dwv => defi.dwv, :id => defi.id, :poster => defi.poster }}
end

def create
  word = Word.where('word = ?', params[:word]).first
    if word
      defi = word.definitions.create(:definition => clean(params[:definition]), :poster => session[:user])
    else
      newword = Word.create(:word => clean(params[:word]))
      defi = newword.definitions.create(:definition => clean(params[:definition]), :poster => session[:user])
    end
  render :json => {:word => clean(params[:word]), :definition => clean(params[:definition]), :id => defi.id }
end

end
