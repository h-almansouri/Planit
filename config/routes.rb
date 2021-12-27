Rails.application.routes.draw do
  
  # resources :admin_groups
  # resources :joined_groups
  # resources :messages
  # resources :group_events
  # resources :personal_events

  #basic RESTful routes
  resources :groups
  resources :users, only: [:index, :destroy, :update]


  #user session handling routes
  post '/signup', to: 'users#create'
  get '/me', to: 'users#me'


  #session routes
  post "/login", to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'


  #user custome routes
  get '/my_admin_groups', to: 'users#admin_groups'
  get '/my_joined_groups', to: 'users#joined_groups'
  get '/my_messages', to: 'users#my_messages'
  get '/my_personal_events', to: 'users#personal_events'
  get '/my_group_events', to: 'users#group_events'

  


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
