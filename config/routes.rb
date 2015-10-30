Rails.application.routes.draw do
  devise_for :users, :path_names => {:sign_up => "register", :sign_in => "signin", :sign_out => "signout" }
  mount Ckeditor::Engine => '/ckeditor'
  resources :news

  root to: "news#index"

end