class Appearance::UserListJob < ApplicationJob
  queue_as :critical

  def perform(user)
    users = User.where(online: true)

    users_list = User.parse(users, [:user])
    current_user = User.parse(user, [:user, :user_view, :user_view_self])
    ActionCable.server.broadcast("home_#{user.id}", ChannelHelpers.params(:list_online_users, { users_list: users_list, user: current_user }))
  end
end
