Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  resources :news

  root to: "news#index"

end