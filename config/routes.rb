require 'sidekiq/web'

Rails.application.routes.draw do
  root 'home#index'

  resources :home, only: [:index]
  authenticate :user do
    mount Sidekiq::Web => '/sidekiq'
  end
  mount ActionCable.server => '/cable'

  devise_for :users, skip: [:registrations, :passwords, :sessions], path: '', controllers: { confirmations: 'user/confirmations' }
  devise_scope :user do
    get '/forgot-password'      => 'user/passwords#new',        as: :new_user_password
    post '/forgot-password'     => 'user/passwords#create',     as: :user_password
    get '/forgot-password/edit' => 'user/passwords#edit',       as: :edit_user_password
    get '/register'             => 'user/registrations#new',    as: :new_user_registration
    post '/register'            => 'user/registrations#create', as: :user_registration
    get '/login'                => 'user/sessions#new',         as: :new_user_session
    post '/logout'              => 'user/sessions#create',      as: :user_session
    get '/logout'               => 'user/sessions#destroy',     as: :destroy_user_session
  end

  namespace :api do
    resources :chat, only: [:index, :show] do
      post :create, on: :member
    end
    resources :poll, only: [:create]
    resources :themes, only: [:index] do
      post :color, on: :collection
      post :brightness, on: :collection
    end

    resources :rate, only: [] do
      post :view, on: :collection
      post :rate, on: :collection
    end

    resources :comments, only: [:create, :destroy, :update] do
      post :list, on: :collection
    end
  end

  get '*path', to: 'home#index'
end
