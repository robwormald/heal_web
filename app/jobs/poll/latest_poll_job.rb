class Poll::LatestPollJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    poll = Poll.last
    if(poll)
      questions = poll_questions_with_answers(poll.id)
      answer = PollAnswer.joins(:poll_question).where(user_id: user_id, poll_questions: { poll_id: poll.id }).first

      ActionCable.server.broadcast("home_#{user_id}", ChannelHelpers.params(:latest_poll, { poll: poll, questions: questions, answered: answer }))
    else
      ActionCable.server.broadcast("home_#{user_id}", ChannelHelpers.params(:latest_poll, {  }))
    end
  end
end
