class Appearance::LocationJob < ApplicationJob
  queue_as :default

  def perform(user, location)
    user.update(location: location)
    ActionCable.server.broadcast("home_#{user.id}", ChannelHelpers.params(:update_current_user, { user: User.parse(user, [:user, :user_view, :user_view_self]) }))
    ActionCable.server.broadcast('home_all', ChannelHelpers.params(:update_online_users, { user: User.parse(user, [:user]) }))
  end
end
