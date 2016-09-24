class User < ApplicationRecord
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :email, presence: true, uniqueness: { case_sensitive: false }

  has_many :messages, dependent: :destroy

  devise :database_authenticatable, :confirmable, :registerable, :recoverable, :trackable, :validatable

  def email_required?
    false
  end

  def email_changed?
    false
  end
end
