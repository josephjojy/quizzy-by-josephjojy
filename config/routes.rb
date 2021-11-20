# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :users, only: %i[create index]
    resource :sessions, only: %i[create destroy]
    resources :quizzes, only: %i[create index destroy update show ]
    resources :questions, only: %i[create destroy update]
    resources :attempts, only: %i[create update show]

  end

  get "quizzes/setSlug/:id", to: "quizzes#set_slug"

  get "quizzes/showSlug/:slug", to: "quizzes#show_slug"

  get "quizzes/showAnswer/:slug", to: "quizzes#show_answer"

  get "quizzes/generate/report", to: "quizzes#generate_report"

  get "users/export/report", to: "users#export_report"

  get "users/export/status/:job_id", to: "users#export_status"

  get "users/export/download/:job_id", to: "users#export_download"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
