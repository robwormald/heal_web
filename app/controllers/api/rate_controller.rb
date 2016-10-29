class Api::RateController < ApiController
  def view
    if object = find_rateable
      render json: success_json(object)
    else
      head :bad_request
    end
  end

  def rate
    if model_rate
      render json: success_json(find_rateable)
    else
      head :bad_request
    end
  end

  private

  def model_rate
    hash = {
      'for'     => ->(user, rateable) { user.vote_exclusively_for(rateable) },
      'against' => ->(user, rateable) { user.vote_exclusively_against(rateable) },
      'none'    => ->(user, rateable) { user.unvote_for(rateable) },
    }

    method = strong_params[:method]
    if hash[method].present?
      rateable = find_rateable
      hash[method].call(current_user, rateable) if rateable.present?
      true
    else
      false
    end
  end

  def find_rateable
    hash = {
      'poll' => Poll,
    }

    type = strong_params[:type]
    hash[type].find_by(id: strong_params[:id]) if hash[type].present?
  end

  def strong_params
    params.require(:rating).permit(:method, :type, :id)
  end

  def success_json(object)
    ratings = object.votes.includes(:voter)
    ratings = ratings.as_json(only: Constants::SAFE_PARAMS[:rating], include: { voter: { only: Constants::SAFE_PARAMS[:user] } })
    user = current_user.votes.where(voteable: object).first
    user = user.as_json(only: Constants::SAFE_PARAMS[:rating])

    { ratings: ratings, user: user }
  end
end
