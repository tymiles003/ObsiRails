Rails.application.routes.draw do
  resources :shows
  resources :videos
  resources :tracks
  resources :musics, :path => "music"
  resources :photos
  resources :images
  resources :messages
  resources :news
  
  devise_for :users, :path_names => {:sign_up => "register", :sign_in => "signin", :sign_out => "signout" }
  
  mount Ckeditor::Engine => '/ckeditor'
  
  get  'contact', to: 'messages#new', as: 'contact'
  post 'contact', to: 'messages#create'
  
  get ':id', to: 'pages#show'
  


  root 'pages#home'

end