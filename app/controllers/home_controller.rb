class HomeController < ApplicationController
  def index
    if current_user
      render :index
    else
      redirect_to authorization_index_path
    end
  end
end
