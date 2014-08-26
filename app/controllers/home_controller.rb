class HomeController < ApplicationController

  def index
    @contact = Contact.new(params[:contact])
  end

end
