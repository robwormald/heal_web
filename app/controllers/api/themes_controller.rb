class Api::ThemesController < ApiController
  def change
    colors = ['red', 'green', 'blue'];

    if colors.include?(params[:color])
      session[:theme] = "themes-#{params[:color]}"
      head :ok
    else
      head :bad_request
    end
  end
end
