module ApplicationHelper
  def devise_error_messages_auth!
    return "" unless devise_error_messages?

    messages = resource.errors.full_messages.map { |msg| content_tag(:div, msg) }.join

    html = <<-HTML
    <div class='form-errors'>
      <div>#{messages}</div>
    </div>
    HTML

    html.html_safe
  end

  def devise_error_messages?
    !resource.errors.empty?
  end

  def user_data_for_angular
    {
      current_user: User.parse(current_user, [:user, :user_view, :user_view_self]),
      preferences: {
        color:      session[:color],
        language:   session[:language],
        brightness: session[:brightness],
      }
    }.to_json
  end
end
