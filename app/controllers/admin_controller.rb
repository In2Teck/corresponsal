class AdminController < ApplicationController

  authorize_resource :class => false

	def index
    @users = User.all.length
    @entries = Entry.where("video_id is not null").length
	end

end
