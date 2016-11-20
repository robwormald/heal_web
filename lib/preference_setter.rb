module PreferenceSetter
  def self.set(session, preference)
    session[:color]      = preference.color
    session[:language]   = preference.language
    session[:brightness] = preference.brightness
  end
end
