class CreatePollQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :poll_questions do |t|
      t.string :question

      t.timestamps
    end

    add_reference(:poll_questions, :poll)
  end
end
