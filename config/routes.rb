Rails.application.routes.draw do
  root 'home#index'

  resources :home, only: [:index]

  devise_for :users, skip: [:registrations, :passwords], path: '', path_names: {
    sign_in: 'login',
    sign_up: 'register',
    sign_out: 'logout',
  }

  devise_scope :user do
    get '/forgot-password'  => 'devise/passwords#new',        as: :new_user_password
    get '/forgot-password'  => 'devise/passwords#create',     as: :user_password
    get '/register'         => 'devise/registrations#new',    as: :new_user_registration
    post '/register'        => 'devise/registrations#create', as: :user_registration
  end
end
