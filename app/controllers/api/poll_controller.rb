class Api::PollController < ApiController
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
end
