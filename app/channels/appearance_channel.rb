# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    change_online_status(true)
    ActionCable.server.broadcast('appearance', { user: as_json(current_user), type: :join })

    stream_from 'appearance'
  end

  def unsubscribed
    change_online_status(false)
    ActionCable.server.broadcast('appearance', { user: as_json(current_user), type: :leave })
  end

  def user_list
    users = User.where(online: true);
    transmit({ users: as_json(users), current_user: current_user, type: :list })
  end

  def location(data)
    current_user.update(location: data['location'])
    ActionCable.server.broadcast('appearance', { user: as_json(current_user), type: :update })
  end

  private

  def as_json(data)
    data.as_json(only: Constants::SAFE_PARAMS[:user])
  end

  def change_online_status(status)
    current_user.update(online: status)
  end
end
