class CreatePolls < ActiveRecord::Migration[5.0]
  def change
    create_table :polls do |t|
      t.string :title

      t.timestamps
    end

    add_index :polls, :title, unique: true
  end
end
