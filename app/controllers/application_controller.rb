class ApplicationController < ActionController::Base
  protect_from_forgery



def clean(param)
 clean_param = Sanitize.clean(param)
end


end
