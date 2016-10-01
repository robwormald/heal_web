class ChatMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast("chat:#{message.chat_room_id}", ChannelHelpers.params(:new_message, { message: ChatMessageSerializer.new(message) }))
  end
end
