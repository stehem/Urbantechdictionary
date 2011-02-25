class HomeController < ApplicationController


def index
  @words =  Word.select('word, id').to_json
  @letters = ('A'..'Z').to_a
end

end
