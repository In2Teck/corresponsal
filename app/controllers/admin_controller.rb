class AdminController < ApplicationController

  #authorize_resource :class => false

  def logout
    reset_session
    redirect_to :signin
  end

	def index
    if not(current_user.try("roles") and current_user.role? :admin)
      reset_session
      redirect_to :signin
    else
      @users = User.all.length
      @entries = Entry.where("video_id is not null").length
    end
	end

end
