class Appearance::LocationJob < ApplicationJob
  queue_as :default

  def perform(user, location)
    user.update(location: location)
    ActionCable.server.broadcast('appearance', ChannelHelpers.params(:update, { user: parse_user(user) }))
  end
end
