class ErrorsController < ApplicationController
  def errors404
    render status :not_found
  end
end