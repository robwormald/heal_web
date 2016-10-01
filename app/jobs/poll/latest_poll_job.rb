class Poll::LatestPollJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    poll = Poll.last
    questions = PollQuestion.select('poll_questions.*', 'count(poll_answers.id) AS answer_count')
      .left_outer_joins(:poll_answers)
      .where(poll_id: poll)
      .order(id: :asc).group(:id)

    answer = PollAnswer.joins(:poll_question).where(user_id: user_id, poll_questions: { poll_id: poll.id }).first

    ActionCable.server.broadcast("home_#{user_id}", ChannelHelpers.params(:latest_poll, { poll: poll, questions: questions, answered: answer }))
  end
end
