class Home::ServerMonitorAllJob < ApplicationJob
  queue_as :default
  include Sidetiq::Schedulable

  recurrence { minutely }

  def perform
    Home::ServerMonitorAllJob.query_and_send
  end

  def self.perform_at(param)
    self.query_and_send
  end

  def self.query_and_send
    data = ServerMonitor.query
    ActionCable.server.broadcast('home_all', ChannelHelpers.params(:server_monitor, data))
  end
end
