Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  get '/current_user', to: 'current_user#index'

  devise_for :users, path: '/', path_names:
  {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
                     controllers: {
                       sessions: 'users/sessions',
                       registrations: 'users/registrations'
                     }

  namespace :api do
    namespace :v1 do
      resources :city, only: %i[index create]
      resources :homes, only: %i[index show create destroy]
      resources :reservations, only: %i[index show create destroy]
      resources :users, only: %i[index show create]
    end
  end
end
