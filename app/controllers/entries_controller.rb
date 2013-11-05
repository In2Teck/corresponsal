#encoding: utf-8

class EntriesController < ApplicationController
  # GET /entries
  # GET /entries.json
  def index
    #@entries = Entry.where("video_id is not null")
    @entries = Entry.find_by_sql("SELECT (users.first_name || ' ' || users.last_name) as autor, entries.id ,entries.created_at as fecha, entries.user_uid, entries.video_id, entries.ticket_number, entries.playback_url, entries.thumbnail_url, entries.created_at FROM entries LEFT OUTER JOIN users ON entries.user_uid = users.uid WHERE entries.video_id is not null ORDER BY #{sort_column} #{sort_direction}").paginate(:page => params[:page])

    respond_to do |format|
      format.html {render layout: "admin"}
      format.json { render json: @entries }
    end
  end

  # GET /entries/1
  # GET /entries/1.json
  def show
    @entry = Entry.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @entry }
    end
  end

  # GET /entries/new
  # GET /entries/new.json
  def new
    @entry = Entry.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @entry }
    end
  end

  # GET /entries/1/edit
  def edit
    @entry = Entry.find(params[:id])
  end

  # POST /entries
  # POST /entries.json
  def create
    @entry = Entry.new(params[:entry])

    respond_to do |format|
      if @entry.save
        format.json { render json: @entry, status: :created, location: @entry }
      else
        format.json { render json: {:mensaje => "EL NÚMERO DE TICKET YA ESTA REGISTRADO. REGISTRA UNO DIFERENTE"}, status: :unprocessable_entity }
      end
    end
    # respond_to do |format|
    #   format.json { render json: {:prueba => "prueba"}}
    # end
  end

  # PUT /entries/1
  # PUT /entries/1.json
  def update
    @entry = Entry.find(params[:id])

    respond_to do |format|
      if @entry.update_attributes(params[:entry])
        format.html { redirect_to @entry, notice: 'Entry was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /entries/1
  # DELETE /entries/1.json
  def destroy
    @entry = Entry.find(params[:id])
    @entry.destroy

    respond_to do |format|
      format.html { redirect_to entries_url }
      format.json { head :no_content }
    end
  end

  def download
    entry = Entry.find(params[:entry_id])
    timestamp = Time.now.to_i
    hash = Digest::MD5.hexdigest("DOWNLOAD_MP4" + "JOSECUERVO" + timestamp.to_s + "josecuervo" + ENV['MAILVU_SECRET'] + entry.id.to_s + entry.video_id)
    render :json => {:hash => hash, :timestamp => timestamp, :video_id => entry.video_id}
  end

end
