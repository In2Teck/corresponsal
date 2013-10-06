class Entry < ActiveRecord::Base
  attr_accessible :playback_url, :thumbnail_url, :ticket_number, :user_uid, :video_id
end
