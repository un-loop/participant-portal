Rails.application.routes.draw do
  # Routes for Google authentication
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  # On failed authorization redirect to sign in page
  get 'auth/failure', to: redirect('/users/sign_in')

  devise_scope :user do
    get 'users/sign_out', :to => 'devise/sessions#destroy'
  end

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  resources :assignments, :studio_assessments, only: :index
  
  resources :staffs, only: [] do
    collection do
      get 'dashboard', to: 'staffs#dashboard'
    end
  end

  resources :participants, only: [:show] do
    collection do
      get 'dashboard', to: 'participants#dashboard'
    end
  end

  namespace :api, defaults: { format: :json } do
    resources :paperworks, only: [:create, :update, :destroy] do
      patch 'complete', to: 'paperworks#complete', on: :member
      patch 'viewed', to: 'paperworks#viewed', on: :member
    end
    resources :case_notes, only: [:create, :update, :destroy] do
      patch 'not_visible', to: 'case_notes#not_visible', on: :member
    end

    scope '/assignments' do
      post 'templates', to: 'assignments#create_template'
      patch 'templates/:id', to: 'assignments#update_template'
      delete 'templates/:id', to: 'assignments#destroy_template'
      patch 'complete/:id', to: 'assignments#complete'
    end

    resources :studio_assessments, only: [:create, :update, :destroy]
    resources :assignments, only: [:create, :update, :destroy]
    resources :professional_questionnaires, only: [:create, :update, :destroy]
    resources :personal_questionnaires, only: [:create, :update, :destroy]
    
    resources :participants, only: [] do
      collection do
        get 'statuses', to: 'participants#statuses'
      end
    end
    
  end
  # This is root path
  root 'pages#dashboard'
end
