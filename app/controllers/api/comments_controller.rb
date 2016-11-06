class Api::CommentsController < ApiController
  before_action :has_access, only: [:destroy, :update]

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

  def destroy
    @comment.destroy
    commentable = find_commentable(@comment.commentable_id, @comment.commentable_type.downcase)
    render json: success_json(commentable)
  end

  def update
    if @comment.update_attributes(body: params[:body])
      commentable = find_commentable(@comment.commentable_id, @comment.commentable_type.downcase)
      render json: success_json(commentable)
    else
      head :bad_request
    end
  end

  private

  def has_access
    @comment = Comment.where(id: params[:id]).includes(:user).take
    head :bad_request unless @comment && can_moderate(@comment.user.id)
  end

  def create_comment
    find_commentable.comments.new(user: current_user, body: strong_params[:comment]).save
  end

  def find_commentable(id = nil, type = nil)
    hash = {
      'poll' => Poll,
      'article' => Article,
    }

    commentable_id = id || strong_params[:id]
    commentable_type = type || strong_params[:type]
    hash[commentable_type].find_by(id: commentable_id) if hash[commentable_type].present?
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
