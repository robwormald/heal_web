class Comment < ApplicationRecord
  acts_as_paranoid
  acts_as_voteable

  belongs_to :user
  belongs_to :commentable, polymorphic: true

  validates :user, :commentable, :body, presence: true
  validates :body, length: { minimum: 1, maximum: 1000 }
end
