class ChatMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast "chat:#{message.chat_room_id}", {
      message: ChatMessageSerializer.new(message),
      chat_room_id: message.chat_room_id
    }
  end
end
