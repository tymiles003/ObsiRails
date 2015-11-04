Rails.application.routes.draw do
  resources :messages
  resources :news
  
  devise_for :users, :path_names => {:sign_up => "register", :sign_in => "signin", :sign_out => "signout" }
  
  mount Ckeditor::Engine => '/ckeditor'
  root to: "news#index"
  
  get  'contact', to: 'messages#new', as: 'contact'
  post 'contact', to: 'messages#create'
  
end