class Poll::LatestPollJob < ApplicationJob
  queue_as :default

  def perform(id)
    poll = Poll.last
    questions = PollQuestion.where(poll_id: poll).select('poll_questions.*', 'count(poll_answers.id) AS answer_count').left_outer_joins(:poll_answers).group(:id)

    ActionCable.server.broadcast("home_#{id}", ChannelHelpers.params(:latest_poll, { poll: poll, questions: questions }))
  end
end
