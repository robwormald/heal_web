class Api::ArticleController < ApiController
  PER_PAGE = 3

  def list
    page = params[:page].to_i
    articles = Article.includes(:user).order(id: :desc).page(page).per(PER_PAGE)
    articles = articles.as_json(include: { user: { only: Constants::SAFE_PARAMS[:user] } })

    render json: { articles: articles, count: Article.count, page: page, per: PER_PAGE }
  end

  def view
    article = Article.includes(:user).where(id: params[:id]).take
    article = article.as_json(include: { user: { only: Constants::SAFE_PARAMS[:user] } })

    render json: { article: article }
  end
end
