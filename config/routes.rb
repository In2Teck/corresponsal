Corresponsal::Application.routes.draw do
  
  resources :entries do
    match 'download'
  end

  resources :roles

  devise_for :users, :controllers => {:omniauth_callbacks => "users/omniauth_callbacks"}

  devise_scope :user do
	  get 'logout', :to => "devise/sessions#destroy"
	  get 'signin', :to => "devise/sessions#new"
	  get 'signup', :to => "devise/registrations#new"
  end

  resources :users do
    match 'get_entries'
  end

  match 'new_entry' => 'display#new_entry', :as => :new_entry

  match 'get_ready' => 'display#get_ready', :as => :get_ready

  match 'record_entry/:entry_id' => 'display#record_entry', :as => :record_entry

  match 'confirmation' => 'display#confirmation', :as => :confirmation

  match 'recording_complete' => 'display#recording_complete', :as => :recording_complete

  match 'admin' => 'admin#index', :as => :admin

  match 'admin/logout', :to => "admin#logout", :as => :admin_logout

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'display#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
