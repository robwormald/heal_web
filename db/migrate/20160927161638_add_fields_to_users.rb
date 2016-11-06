class AddFieldsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :permissions, :string, array: true, default: [:member]
    add_column :users, :online, :boolean, default: false
    add_column :users, :location, :string, default: '/'
    add_column :users, :residence, :string
    add_column :users, :signature, :text
    add_column :users, :birthday, :datetime
  end
end
