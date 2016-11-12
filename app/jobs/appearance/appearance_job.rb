class Appearance::AppearanceJob < ApplicationJob
  queue_as :default

  def perform(user, event)
    user.update(online: event == 'join')
    ActionCable.server.broadcast('appearance', ChannelHelpers.params(event, { user: User.parse(user) }))
  end
end
