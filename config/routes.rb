Rails.application.routes.draw do
  
  resources :group_events
  resources :groups
  resources :admin_groups
  resources :joined_groups
  resources :messages
  resources :users
  resources :personal_events
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
