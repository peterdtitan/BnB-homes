Rails.application.routes.draw do
  devise_for :users
  
  # root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :city, only: [:index, :create]
      resources :homes, only: [:index, :show, :create, :destroy]
      resources :reservations, only: [:index, :show, :create, :destroy]
      resources :users, only: [:index]
    end
  end
end
