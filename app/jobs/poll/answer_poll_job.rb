class Poll::AnswerPollJob < ApplicationJob
  queue_as :default

  def perform(user_id, poll_id, answer)
    poll = Poll.last
    questions = poll_questions_with_answers(poll_id)

    if poll_id != poll.id
      poll = Poll.where(id: poll_id).first
    end

    ActionCable.server.broadcast('home_all', ChannelHelpers.params(:answered_poll, { poll: poll, questions: questions, answered: answer }))
  end
end
