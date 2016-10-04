# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class PollChannel < ApplicationCable::Channel
  def subscribed
    stream_from "poll_#{current_user.id}"
  end

  def unsubscribed
    stop_all_streams
  end

  def current_poll(data)
    Poll::CurrentPollJob.perform_later(current_user.id, data['poll_id'])
  end

  def poll_list(data)
    Poll::PollListJob.perform_later(current_user.id, data['page'])
  end
end
