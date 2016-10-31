class ApiController < ActionController::API
  before_action :authenticate_user!

  private

  def is_admin_or_mod
    ['administrator', 'moderator'].any? { |role| current_user.permissions.include?(role) }
  end

  def can_moderate(user_id)
    is_admin_or_mod || user_id == current_user.id
  end
end
