class VoteController < ApplicationController

respond_to :js

def create
  definition = Definition.find(params[:def_id])
  case params[:vtype]
    when "p"
      if !Vote.has_voted(params[:def_id],request.remote_ip)
        definition.increment!(:upv)
        definition.votes.create(:ip => request.remote_ip)
        render :nothing => true
      else
        render :json => {:result => "fail"}
      end
    when "n"
      if !Vote.has_voted(params[:def_id],request.remote_ip)
        definition.increment!(:dwv)
        definition.votes.create(:ip => request.remote_ip)
        render :nothing => true
      else
        render :json => {:result => "fail"}
      end
  end
end

end
