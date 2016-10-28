module ThemesSetter
  def self.color(session, preference)
    session[:color] = "color-#{preference.color}"
  end

  def self.brightness(session, preference)
    session[:brightness] = "brightness-#{preference.brightness}"
  end
end
