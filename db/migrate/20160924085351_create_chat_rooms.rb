class CreateChatRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :chat_rooms do |t|
      t.string :title
      t.string :permissions, array: true, default: Constants::DEFAULT_SYSTEM_ROLES

      t.timestamps
    end
  end
end
