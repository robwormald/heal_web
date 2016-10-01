# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    change_online_status(true)
    ActionCable.server.broadcast('appearance', sending_params(:join, { user: as_json(current_user) }))

    stream_from 'appearance'
  end

  def unsubscribed
    change_online_status(false)
    ActionCable.server.broadcast('appearance', sending_params(:leave, { user: as_json(current_user) }))
  end

  def user_list
    users = User.where(online: true);
    transmit(sending_params(:list, { users: as_json(users), current_user: current_user }))
  end

  def location(data)
    current_user.update(location: data['location'])
    ActionCable.server.broadcast('appearance', sending_params(:update, { user: as_json(current_user) }))
  end

  def sample_notif
    ActionCable.server.broadcast("home_#{current_user.id}", sending_params(:notification, { type: 'danger', title: 'Sample', body: 'Notification' }))
  end

  private

  def as_json(data)
    data.as_json(only: Constants::SAFE_PARAMS[:user])
  end

  def change_online_status(status)
    current_user.update(online: status)
  end
end
