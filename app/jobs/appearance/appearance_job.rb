class Appearance::AppearanceJob < ApplicationJob
  queue_as :default

  def perform(user, event)
    user.update(online: event == 'online_join')
    ActionCable.server.broadcast('home_all', ChannelHelpers.params(event, { user: User.parse(user, [:user]) }))

    Appearance::UserListJob.perform_later(user) if event == 'online_join'
  end
end
