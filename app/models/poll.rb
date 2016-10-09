class Poll < ApplicationRecord
  has_many :poll_questions, dependent: :destroy
  has_many :poll_answers, through: :poll_questions, dependent: :destroy
  has_many :comments, as: :commentable
end
