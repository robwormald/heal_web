Rails.application.routes.draw do
  root 'home#index'

  resources :home, only: [:index]

  devise_for :users, skip: [:registrations], path: '', path_names: {
    sign_in: 'login',
    sign_up: 'register',
    sign_out: 'logout',
    password: 'forgot-password'
  }

  devise_scope :user do
    get '/register'  => 'devise/registrations#new',    as: :new_user_registration
    post '/register' => 'devise/registrations#create', as: :user_registration
  end
end
