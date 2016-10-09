class PollAnswer < ApplicationRecord
  belongs_to :user
  belongs_to :poll_question
end
