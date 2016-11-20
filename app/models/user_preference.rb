class UserPreference < ApplicationRecord
  belongs_to :user

  enum color:      [:red, :green, :blue]
  enum language:   [:en, :lv]
  enum brightness: [:light, :dark]
end
