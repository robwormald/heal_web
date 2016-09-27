class AddFieldsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :permissions, :string, array: true, default: [:member]
  end
end
