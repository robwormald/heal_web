require 'sidekiq/web'

Rails.application.routes.draw do
  root 'home#index'

  resources :home, only: [:index]
  authenticate :user do
    mount Sidekiq::Web => '/sidekiq'
  end
  mount ActionCable.server => '/cable'

  devise_for :users, skip: [:registrations, :passwords, :sessions], path: ''
  devise_scope :user do
    get '/forgot-password'      => 'devise/passwords#new',        as: :new_user_password
    post '/forgot-password'     => 'devise/passwords#create',     as: :user_password
    get '/forgot-password/edit' => 'devise/passwords#edit',       as: :edit_user_password
    get '/register'             => 'devise/registrations#new',    as: :new_user_registration
    post '/register'            => 'devise/registrations#create', as: :user_registration
    get '/login'                => 'devise/sessions#new',         as: :new_user_session
    post '/logout'              => 'devise/sessions#create',      as: :user_session
    get '/logout'               => 'devise/sessions#destroy',     as: :destroy_user_session
  end

  namespace :api do
    resources :chat, only: [:index, :show] do
      post :create, on: :member
    end
    resources :poll, only: [:create]
  end

  get '*path', to: 'home#index'
end
