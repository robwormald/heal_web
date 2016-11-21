class Home::ServerMonitorJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    redis = Redis.new
    data = JSON.parse(redis.get('server_monitor'))
    ActionCable.server.broadcast("home_#{user_id}", ChannelHelpers.params(:server_monitor, data))
  end
end
