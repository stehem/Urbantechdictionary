class HomeController < ApplicationController



def index
  @letters = ('A'..'Z').to_a
  defis = Definition.includes(:word).order('created_at DESC')
  @latest = latest(defis).to_json
end


def latest_defs
  defis = Definition.includes(:word).order('created_at DESC')
  render :json => latest(defis)
end

def latest(f)
  f.collect! {|i| {
                    "word" => i.word.word, 
                    "definition" => i.definition,
                    "id" => i.id,
                    "poster" => i.poster,
                    "upv" => i.upv,
                    "dwv" => i.dwv }}
end

end




