class Api::UserController < ApiController
  PER_PAGE = 20

  def list
    page = params[:page].to_i
    users = User.order(id: :desc).page(page).per(PER_PAGE)
    users = users.as_json(only: Constants::SAFE_PARAMS[:user])

    render json: { users: users, count: User.count, page: page, per: PER_PAGE }
  end

  def view
    if params[:id].blank? || params[:id].to_i == 0
      user = current_user
    else
      user = User.where(id: params[:id]).take
    end

    render json: { user: User.parse(user, :current_user) }
  end
end
