class Definition < ActiveRecord::Base

belongs_to :word
has_many :votes

validates_presence_of :definition
attr_accessible :definition, :poster




end
