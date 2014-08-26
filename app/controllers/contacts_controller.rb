class ContactsController < ApplicationController

  def index
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(params[:contact])
    @contact.request = request
    if @contact.deliver
      flash.now[:notice] = "Ok!"
    else
      format.json { render :json => { :error => @contact.errors.full_messages }, :status => 422 }
    end
    render :template => 'home/index', :layout => false
  end

end
