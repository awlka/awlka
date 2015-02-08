class ErrorsController < ApplicationController
  layout "errors"
  def error404
    render status: :not_found
  end
end
