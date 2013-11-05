class ApplicationController < ActionController::Base
  protect_from_forgery
  
  rescue_from CanCan::AccessDenied do |exception|
	  render :file => "#{Rails.root}/public/403.html", :status => 403, :layout => false
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
