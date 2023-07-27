Rails.application.routes.draw do
  devise_for :users
  # root 'pages#index'
  namespace :api do
    namespace :v1 do
      resources :city
      resources :homes
      resources :reservations
      resources :users
    end
  end
end

