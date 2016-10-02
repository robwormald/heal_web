module ChannelHelpers
  def self.params(event, data)
    { event: event, data: data }
  end

  def self.notification(id, type, title, body)
    ActionCable.server.broadcast("home_#{id}", self.params(:notification, { type: type, title: title, body: body }))
  end

  def self.error_notification(id, body)
    ActionCable.server.broadcast("home_#{id}", self.params(:notification, { type: 'danger', title: 'Error', body: body }))
  end
end
