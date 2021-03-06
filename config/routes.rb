Rails.application.routes.draw do
  
  # resources :admin_groups
  # resources :messages
  

  #basic RESTful routes
  resources :groups
  resources :users, only: [:show, :destroy, :update]
  resources :group_events, only: [:create, :destroy, :update]
  resources :personal_events, only: [:create, :destroy, :update]
  resources :joined_groups, only: [:create]
  resources :messages, only: [:index, :create]


  #user session handling routes
  post '/signup', to: 'users#create'
  get '/me', to: 'users#me'


  #session routes
  post "/login", to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'


  #user custom routes
  get '/my_admin_groups', to: 'users#admin_groups'
  get '/my_joined_groups', to: 'users#joined_groups'
  get '/my_total_groups', to: 'users#all_groups'
  get '/my_messages', to: 'users#my_messages'
  get '/my_personal_events', to: 'users#personal_events'
  get '/my_group_events', to: 'users#group_events'
  get '/all_events', to: 'users#all_events'


  #group custom routes
  get '/search_groups/:name', to: 'groups#search_groups'
  

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
