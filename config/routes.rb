# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :users, only: %i[create index]
    resource :sessions, only: %i[create destroy]
    resources :quizzes, only: %i[create index ]
    resources :quizzes, only: %i[destroy], param: :id

  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
