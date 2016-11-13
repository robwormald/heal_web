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

  def self.parse(user, params = nil)
    if params
      only = map_user_params(params)
    else
      only = Constants::SAFE_PARAMS[:user]
    end

    user.as_json(only: only)
  end

  private

  def self.map_user_params(params)
    if params.is_a?(Array)
      params.map { |param| Constants::SAFE_PARAMS[param] }.flatten
    else
      Constants::SAFE_PARAMS[params]
    end
  end

  def add_preferences
    self.preference = UserPreference.create
  end
end
