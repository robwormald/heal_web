class Poll < ApplicationRecord
  acts_as_voteable

  has_many :poll_questions, dependent: :destroy
  has_many :poll_answers, through: :poll_questions, dependent: :destroy
  has_many :comments, as: :commentable
end
