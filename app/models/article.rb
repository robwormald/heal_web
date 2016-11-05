class Article < ApplicationRecord
  acts_as_voteable

  belongs_to :user
  has_many :comments, as: :commentable

  validates :title, length: { minimum: 5, maximum: 40 }
  validates :description, length: { minimum: 200, maximum: 500 }
  validates :body, :title, :image, :description, :user, presence: true
end
