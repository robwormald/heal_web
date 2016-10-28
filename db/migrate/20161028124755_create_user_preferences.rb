class CreateUserPreferences < ActiveRecord::Migration[5.0]
  def change
    create_table :user_preferences do |t|
      t.references :user, index: true
      t.integer :color, default: 0
      t.integer :brightness, default: 0
      t.timestamps
    end
  end
end
