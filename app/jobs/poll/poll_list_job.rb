class Poll::PollListJob < ApplicationJob
  queue_as :default

  def perform(user_id, page)
    polls = Poll.order(created_at: :desc).page(page).per(10)
    total_count = Poll.count

    ActionCable.server.broadcast("poll_#{user_id}", ChannelHelpers.params(:poll_list, { polls: polls, total_count: total_count, current_page: page }))
  end
end
