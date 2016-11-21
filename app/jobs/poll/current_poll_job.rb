class Poll::CurrentPollJob < ApplicationJob
  queue_as :default

  def perform(user_id, poll_id)
    poll = Poll.where(id: poll_id).first
    if poll
      questions = poll_questions_with_answers(poll.id)
      answer = PollAnswer.joins(:poll_question).where(user_id: user_id, poll_questions: { poll_id: poll.id }).first

      ActionCable.server.broadcast("home_#{user_id}", ChannelHelpers.params(:current_poll, { poll: poll, questions: questions, answered: answer }))
    else
      ActionCable.server.broadcast("home_#{user_id}", ChannelHelpers.params(:current_poll, {}))
    end
  end
end
