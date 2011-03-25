class SessionController < ApplicationController

def new
  if session[:user]
    render :json => {:logged => 'true'}#, :login => session[:user]}
  else
    render :json => {:logged => 'false'}
  end
end



def create  
  auth = request.env["omniauth.auth"]  
  @name = auth["user_info"]["name"]  
  session[:user] = @name
  redirect_to root_url
end  

def destroy
  session[:user] = nil
  render :nothing => true
end

end
