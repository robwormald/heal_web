class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.string :image, null: false
      t.text :description, null: false
      t.text :body, null: false
      t.references :user, null: false, index: true

      t.timestamps
    end
  end
end
