class ChatMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast("chat:#{message.chat_room_id}", ChannelHelpers.params(:new_message, { message: message.as_json(include: { user: { only: Constants::SAFE_PARAMS[:user] } }) }))
  end
end
