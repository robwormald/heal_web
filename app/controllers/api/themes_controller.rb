class Api::ThemesController < ApiController
  def index
    user_brightness = current_user.preference.brightness
    brightness = UserPreference.brightnesses.keys
    brightness.delete(user_brightness)
    render json: { colors: UserPreference.colors.keys, brightness: brightness.first }
  end

  def color
    preference = current_user.preference

    if preference.update_attributes(color: params[:color])
      ThemesSetter.color(session, preference)
      head :ok
    else
      head :bad_request
    end
  end

  def brightness
    preference = current_user.preference

    if preference.update_attributes(brightness: params[:brightness])
      ThemesSetter.brightness(session, preference)
      head :ok
    else
      head :bad_request
    end
  end
end
