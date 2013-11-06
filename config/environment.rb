# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Corresponsal::Application.initialize!

config.to_prepare do
  Devise::SessionsController.layout "admin"
  Devise::RegistrationsController.layout "admin" 
  Devise::ConfirmationsController.layout "admin"
  Devise::UnlocksController.layout "admin"            
  Devise::PasswordsController.layout "admin"        
end
