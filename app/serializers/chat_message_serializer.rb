class ChatMessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :chat_room_id, :created_at, :user
end
