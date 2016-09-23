Rails.application.routes.draw do
  root 'home#index'

  resources :home, only: [:index]
  resources :authorization, only: [:index]

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
