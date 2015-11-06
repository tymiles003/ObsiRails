Rails.application.routes.draw do
  resources :photos
  resources :images
  resources :messages
  resources :news
  
  devise_for :users, :path_names => {:sign_up => "register", :sign_in => "signin", :sign_out => "signout" }
  
  mount Ckeditor::Engine => '/ckeditor'
  
  get  'contact', to: 'messages#new', as: 'contact'
  post 'contact', to: 'messages#create'
  
  
  root 'pages#home'
  get ':id', to: 'pages#show'
  
end