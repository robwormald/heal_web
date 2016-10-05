class ApplicationJob < ActiveJob::Base
  def poll_questions_with_answers(poll_id)
    PollQuestion.connection.clear_query_cache
    PollQuestion.select('poll_questions.*', 'count(poll_answers.id) AS answer_count')
      .left_outer_joins(:poll_answers)
      .where(poll_id: poll_id)
      .order(id: :asc).group(:id)
  end

  def parse_user(user)
    user.as_json(only: Constants::SAFE_PARAMS[:user])
  end
end
