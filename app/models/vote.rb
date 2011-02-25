class Vote < ActiveRecord::Base

belongs_to :definition

class << self
  def has_voted(id,ip)
    where('definition_id = ? AND ip = ?', id, ip).first
  end
end

end
