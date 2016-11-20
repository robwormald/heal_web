class Api::PreferenceController < ApiController
  def index
    render json: preferences_json
  end

  def change
    preference = current_user.preference

    if preference.update_attributes(valid_params)
      PreferenceSetter.set(session, preference)
      render json: { preferences: preferences_json, user_preference: user_preference_json }
    else
      head :bad_request
    end
  end

  private

  def user_preference_json
    current_user.preference.as_json(only: Constants::SAFE_PARAMS[:user_preference])
  end

  def preferences_json
    preference = current_user.preference

    colors = UserPreference.colors.keys
    languages = remove_user_pref(preference.language, UserPreference.languages.keys)
    brightness = remove_user_pref(preference.brightness, UserPreference.brightnesses.keys)

    { colors: colors, brightness: brightness, languages: languages }
  end

  def remove_user_pref(user_pref, all_prefs)
    all_prefs.delete(user_pref)
    all_prefs
  end

  def valid_params
    params.permit(:color, :language, :brightness)
  end
end
