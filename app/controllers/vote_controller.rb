class VoteController < ApplicationController

respond_to :js

def create
  definition = Definition.find(params[:def_id])
  if Vote.has_voted(params[:def_id],request.remote_ip)
    render :json => {:result => "fail"}
  else
    case params[:vtype]
      when "p"
        definition.increment!(:upv)
        definition.votes.create(:ip => request.remote_ip)
        render :nothing => true
      when "n"
        definition.increment!(:dwv)
        definition.votes.create(:ip => request.remote_ip)
        render :nothing => true
    end
  end
end

end
