class User < ApplicationRecord
  acts_as_voter

  alias_attribute :preference, :user_preference

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :email, presence: true, uniqueness: { case_sensitive: false }

  has_one  :user_preference, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :chat_messages, dependent: :destroy

  after_create :add_preferences

  devise :database_authenticatable, :confirmable, :registerable, :recoverable, :trackable, :validatable

  def email_required?
    false
  end

  def email_changed?
    false
  end

  private

  def add_preferences
    self.preference = UserPreference.create
  end
end
