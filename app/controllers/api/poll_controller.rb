class Api::PollController < ApiController
  def create
    answer = PollAnswer.where(user_id: current_user.id).first_or_initialize(answer_params)

    if answer.nil? || answer.persisted?
      ChannelHelpers.error_notification(current_user.id, 'No vote selected or already voted')
    else
      if answer.save
        Poll::AnswerPollJob.perform_later(params[:poll_id])
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
