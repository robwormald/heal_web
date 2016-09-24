class HomeController < ApplicationController
  layout 'home'
  before_action :authenticate_user!

  def index
    render :index
  end
end
