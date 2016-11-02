class Home::ServerMonitorJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    redis = Redis.new
    ActionCable.server.broadcast("home_#{user_id}", ChannelHelpers.params(:server_monitor, redis.get('server_monitor')))
  end
end
