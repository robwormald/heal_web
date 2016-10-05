# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'appearance'
    stream_from "appearance_#{current_user.id}"
    Appearance::UserListJob.perform_later(current_user)
    Appearance::AppearanceJob.perform_later(current_user, 'join')
  end

  def unsubscribed
    stop_all_streams
    Appearance::AppearanceJob.perform_later(current_user, 'leave')
  end

  def location(data)
    Appearance::LocationJob.perform_later(current_user, data['location'])
  end

  def sample_notif
    ActionCable.server.broadcast("home_#{current_user.id}", ChannelHelpers.params(:notification, { type: 'danger', title: 'Sample', body: 'Notification' }))
  end
end
