Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  get '/current_user' , to: 'current_user#index'

  devise_for :users, path: '/', path_names:
  {
    sign_in: 'login',
    sign_out: 'logout',
  },
  controllers: {
    sessions: 'users/sessions'
}


  namespace :api do
    namespace :v1 do
      resources :city, only: [:index, :create]
      resources :homes, only: [:index, :show, :create, :destroy]
      resources :reservations, only: [:index, :show, :create, :destroy]
      resources :users, only: [:index]
    end
  end
end
