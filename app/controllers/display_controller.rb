class DisplayController < ApplicationController
	
	#authorize_resource :class => false

  def index
    @signed_request = params[:signed_request]
    @is_fan = (decode_data @signed_request)["page"]["liked"] if not @signed_request.blank?
    @is_fan = current_user.is_fan if @signed_request.blank? && current_user != nil
	end

  def new_entry
    @entry = Entry.new
    render :partial => 'new_entry', :content_type => 'text/html'
  end

  def get_ready
    render :partial => 'get_ready', :content_type => 'text/html'
  end

  def record_entry
    @entry_id = params[:entry_id]
    @hash = ""
    render :partial => 'record_entry', :content_type => 'text/html'
  end

	def decode_data str
    encoded_sig, payload = str.split('.')
    data = ActiveSupport::JSON.decode base64_url_decode(payload)
  end

  def base64_url_decode str
    encoded_str = str.gsub('-','+').gsub('_','/')
    encoded_str += '=' while !(encoded_str.size % 4).zero?
    Base64.decode64(encoded_str)
  end
end
