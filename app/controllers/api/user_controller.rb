class Api::UserController < ApiController
  PER_PAGE = 20

  def list
    page = params[:page].to_i
    users = User.order(id: :desc).page(page).per(PER_PAGE)
    users = users.as_json(only: Constants::SAFE_PARAMS[:user])

    render json: { users: users, count: User.count, page: page, per: PER_PAGE }
  end

  def view
    id = params[:id].to_i
    keys = [:user, :user_view]

    if id.blank? || id == 0
      user = current_user
      keys << :user_view_self
    else
      user = User.where(id: params[:id]).take
    end

    render json: { user: User.parse(user, keys) }
  end

  def update
    if update_user
      ChannelHelpers.notification(current_user.id, :success, 'Success', 'Successfully updated your settings')
      render json: { user: User.parse(current_user, [:user, :user_view, :user_view_self]) }
    else
      ChannelHelpers.error_notification(current_user.id, current_user.errors.full_messages.join(", "))
      head :bad_request
    end
  end

  private

  def update_user
    case true
    when params[:type] == 'general'
      return current_user.update(valid_params)
    when params[:type] == 'security'
      updated = current_user.update(valid_params)
      sign_in(current_user, bypass: true) if updated
      return updated
    when params[:type] == 'email'
      return current_user.update(valid_params)
    when params[:type] == 'uploads'
      current_user.avatar = params[:avatar]
      return current_user.save
    end
  end

  def valid_params
    return params[:data].require(:general).permit([:birthday, :residence, :signature]) if params[:general]
    return params[:data].require(:security).permit([:password, :password_confirmation]) if params[:security]
    return params[:data].require(:email).permit([:email]) if params[:email]
  end
end
