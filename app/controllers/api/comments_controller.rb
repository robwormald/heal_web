class Api::CommentsController < ApiController
  def list
    if object = find_commentable
      render json: success_json(object)
    else
      head :bad_request
    end
  end

  def create
    if create_comment
      render json: success_json(find_commentable)
    else
      head :bad_request
    end
  end

  private

  def create_comment
    find_commentable.comments.new(user: current_user, body: strong_params[:comment]).save
  end

  def find_commentable
    hash = {
      'poll' => Poll,
    }

    type = strong_params[:type]
    hash[type].find_by(id: strong_params[:id]) if hash[type].present?
  end

  def strong_params
    params.require(:commentable).permit(:comment, :type, :id)
  end

  def success_json(object)
    comments = object.comments.includes(:user).order(created_at: :desc)
    comments = comments.as_json(only: Constants::SAFE_PARAMS[:comment], include: { user: { only: Constants::SAFE_PARAMS[:user] } })

    { comments: comments }
  end
end
