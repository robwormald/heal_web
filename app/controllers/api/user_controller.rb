class Api::UserController < ApiController
  PER_PAGE = 20

  def list
    page = params[:page].to_i
    users = User.order(id: :desc).page(page).per(PER_PAGE)
    users = users.as_json(only: Constants::SAFE_PARAMS[:user])

    render json: { users: users, count: User.count, page: page, per: PER_PAGE }
  end

  def view
    article = Article.includes(:user).where(id: params[:id]).take
    article = article.as_json(include: { user: { only: Constants::SAFE_PARAMS[:user] } })

    render json: { article: article }
  end
end
