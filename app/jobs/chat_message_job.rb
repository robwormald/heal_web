class ChatMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast "chat:#{message.chat_room_id}", ChatChannel.sending_params(:chat_room, { message: ChatMessageSerializer.new(message) })
  end
end
