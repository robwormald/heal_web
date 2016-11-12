class Appearance::UserListJob < ApplicationJob
  queue_as :critical

  def perform(user)
    users = User.where(online: true)
    users = users.to_a.push(user)
    ActionCable.server.broadcast("appearance_#{user.id}", ChannelHelpers.params(:list, { users_list: User.parse(users), user: User.parse(user, :current_user) }))
  end
end
