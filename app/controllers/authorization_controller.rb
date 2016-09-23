class AuthorizationController < ApplicationController
  def index
    @user = User.new(params[:user])
    render :index
  end
end
