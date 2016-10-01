# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class HomeChannel < ApplicationCable::Channel
  def subscribed
    stream_from current_user
    ActionCable.server.broadcast current_user, sending_params(:notification, { type: 'danger', title: 'Sample', body: 'Notification' })
  end

  def unsubscribed
    stop_all_streams
  end
end
