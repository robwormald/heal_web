# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class HomeChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'home_all'
    stream_from "home_#{current_user.id}"
  end

  def unsubscribed
    stop_all_streams
  end

  def latest_poll
    Poll::LatestPollJob.perform_later(current_user.id)
  end
end
