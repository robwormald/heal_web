class CreatePollAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :poll_answers do |t|
      t.belongs_to :poll_question, index: true
      t.belongs_to :user, index: true
      t.timestamps
    end

  end
end
