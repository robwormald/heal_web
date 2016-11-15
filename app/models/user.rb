class User < ApplicationRecord
  acts_as_voter

  mount_uploader :avatar, Image::AvatarUploader

  alias_attribute :preference, :user_preference

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: Constants::VALID_EMAIL_REGEX, message: 'has invalid format' }
  validates :password, confirmation: true
  validates :password_confirmation, presence: true, if: 'password.present?'
  validates :avatar, file_size: { less_than_or_equal_to: 2.megabytes }

  has_one  :user_preference, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :chat_messages, dependent: :destroy

  before_create :set_birthday
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

  def set_birthday
    self.birthday = DateTime.now
  end

  def add_preferences
    self.preference = UserPreference.create
  end
end
