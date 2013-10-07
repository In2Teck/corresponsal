class Entry < ActiveRecord::Base
  
  belongs_to :user, :primary_key => :uid, :foreign_key => :user_uid

  attr_accessible :playback_url, :thumbnail_url, :ticket_number, :user_uid, :video_id

end
