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

  def list
    if object = find_rateable
      render json: success_json_list(object)
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
    model = string_to_model
    return unless model.present?

    if strong_params[:ids]
      model.where(id: strong_params[:ids]).includes(votes: [:voter])
    else
      model.find_by(id: strong_params[:id])
    end
  end

  def string_to_model
    {
      'poll' => Poll,
      'comment' => Comment,
      'article' => Article,
    }[strong_params[:type]]
  end

  def strong_params
    params.require(:rating).permit(:method, :type, :id, ids: [])
  end

  def success_json(object)
    ratings = ratings_as_json(object.votes.includes(:voter))
    user = current_user.votes.where(voteable: object).first
    user = user_ratings_as_json(user)

    { ratings: ratings, user: user }
  end

  def success_json_list(object)
    ratings = object.map { |rateable| { rateable.id => ratings_as_json(rateable.votes) } }
    user = current_user.votes.where(voteable_id: strong_params[:ids], voteable_type: string_to_model)
    user = user.map { |rateable| { rateable.voteable_id => user_ratings_as_json(rateable) } }

    { ratings: merge_hashes(ratings), user: merge_hashes(user) }
  end

  def merge_hashes(array)
    array.reduce({}, :merge)
  end

  def ratings_as_json(ratings)
    ratings.as_json(only: Constants::SAFE_PARAMS[:rating], include: { voter: { only: Constants::SAFE_PARAMS[:user] } })
  end

  def user_ratings_as_json(ratings)
    ratings.as_json(only: Constants::SAFE_PARAMS[:rating])
  end
end
