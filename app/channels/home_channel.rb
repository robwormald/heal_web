# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class HomeChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'home_all'
    stream_from "home_#{current_user.id}"
  end

  def unsubscribed
    stop_all_streams
    Appearance::AppearanceJob.perform_later(current_user, 'online_leave')
  end

  def joined_channel
    Appearance::AppearanceJob.perform_later(current_user, 'online_join')
  end

  def latest_poll
    Poll::LatestPollJob.perform_later(current_user.id)
  end

  def current_poll(data)
    Poll::CurrentPollJob.perform_later(current_user.id, data['poll_id'])
  end

  def poll_list(data)
    Poll::PollListJob.perform_later(current_user.id, data['page'].to_i)
  end

  def location(data)
    Appearance::LocationJob.perform_later(current_user, data['location'])
  end

  def server_monitor
    Home::ServerMonitorJob.perform_later(current_user.id)
  end
end
