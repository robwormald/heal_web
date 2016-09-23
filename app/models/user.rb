class User < ApplicationRecord
  validates :username, presence: true, uniqueness: { case_sensitive: false }

  devise :database_authenticatable, :confirmable, :registerable, :recoverable, :trackable, :validatable

  def email_changed?
    false
  end
end
