class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string :user_uid
      t.string :ticket_number
      t.string :video_id
      t.string :playback_url
      t.string :thumbnail_url

      t.timestamps
    end
  end
end
