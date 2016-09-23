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
end
