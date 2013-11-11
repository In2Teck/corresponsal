class ApplicationController < ActionController::Base
  protect_from_forgery
  
  rescue_from CanCan::AccessDenied do |exception|
	  render :file => "#{Rails.root}/public/403.html", :status => 403, :layout => false
  end

  def after_sign_in_path_for(resource)
    if current_user.try("roles") and current_user.role? :admin
      :admin
    else
      :root
    end
  end

  require 'will_paginate/array'

  helper_method :sort_column, :sort_direction

  private

  def sort_direction  
    %w[ASC DESC].include?(params[:direction]) ?  params[:direction] : "DESC"  
  end

  def sort_column
    params[:sort] || "fecha"
  end
end
