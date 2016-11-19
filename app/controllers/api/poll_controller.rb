class Api::PollController < ApiController
  def list
    polls = Poll.order(created_at: :desc).page(params[:page]).per(10)
    total_count = Poll.count
    render json: { polls: polls, total_count: total_count, current_page: params[:page] }
  end

  def view
    poll = Poll.where(id: params[:id]).first
    if poll
      questions = poll_questions_with_answers(poll.id)
      answer = PollAnswer.joins(:poll_question).where(user_id: current_user.id, poll_questions: { poll_id: poll.id }).first

      render json: { poll: poll, questions: questions, answered: answer }
    else
      render json: {}
    end
  end

  def create
    permitted_params = answer_params;
    answer = PollAnswer.where(user_id: current_user.id).joins(:poll_question).where({ poll_questions: { poll_id: params[:poll_id] } }).first_or_initialize(permitted_params)

    if answer.nil? || answer.persisted?
      ChannelHelpers.error_notification(current_user.id, 'No vote selected or already voted')
    else
      if answer.save
        Poll::AnswerPollJob.perform_later(current_user.id, params[:poll_id], answer)
        return render json: { data: answer }
      else
        ChannelHelpers.error_notification(current_user.id, answer.errors.full_messages.join(", "))
      end
    end

    head :bad_request
  end

  private

  def answer_params
    params.require(:answer).permit(:poll_question_id)
  end

  def poll_questions_with_answers(poll_id)
    PollQuestion.connection.clear_query_cache
    PollQuestion.select('poll_questions.*', 'count(poll_answers.id) AS answer_count')
      .left_outer_joins(:poll_answers)
      .where(poll_id: poll_id)
      .order(id: :asc).group(:id)
  end
end
