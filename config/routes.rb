Rails.application.routes.draw do
  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  resources :users
  resources :articles
  resources :sessions

  resources :gallery, only: [:index]
  resources :events, only: [:index]
  resources :places, only: [:index]
  root 'places#index'

  root to: 'articles#index'
  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  end
