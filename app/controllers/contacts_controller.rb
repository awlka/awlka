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
      flash.now[:notice] = "Not ok at all!"
    end
    render :template => 'home/index', :layout => false
  end

end
