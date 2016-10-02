class Poll::AnswerPollJob < ApplicationJob
  queue_as :default

  def perform(poll_id)
    poll = Poll.last
    if poll_id == poll.id
      questions = poll_questions_with_answers(poll_id)
      ActionCable.server.broadcast('home_all', ChannelHelpers.params(:latest_poll, { poll: poll, questions: questions }))
    end
  end
end
