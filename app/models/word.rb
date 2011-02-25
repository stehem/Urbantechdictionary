class Word < ActiveRecord::Base

has_many :definitions

validates_presence_of :word



end
