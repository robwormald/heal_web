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
      head :ok
    else
      ChannelHelpers.error_notification(current_user.id, current_user.errors.full_messages.join(", "))
      head :bad_request
    end
  end

  private

  def update_user
    case true
    when params[:general].present?
      return current_user.update(valid_params)
    when params[:security].present?
      updated = current_user.update(valid_params)
      sign_in(current_user, bypass: true) if updated
      return updated
    when params[:email].present?
      return current_user.update(valid_params)
    when params[:upload].present?

    end
  end

  def valid_params
    return params.require(:general).permit([:birthday, :residence, :signature]) if params[:general]
    return params.require(:security).permit([:password, :password_confirmation]) if params[:security]
    return params.require(:email).permit([:email]) if params[:email]
    return params.require(:upload).permit([:avatar]) if params[:upload]
  end
end
