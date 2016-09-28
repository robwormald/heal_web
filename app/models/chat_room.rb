class ChatRoom < ApplicationRecord
  has_many :chat_messages

  validates :title, presence: true, uniqueness: { case_sensitive: false }
end
