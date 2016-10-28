class UserPreference < ApplicationRecord
  belongs_to :user

  enum color: [:red, :green, :blue]
  enum brightness: [:light, :dark]
end
