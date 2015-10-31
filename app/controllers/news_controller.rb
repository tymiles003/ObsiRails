require "html_truncator"
class NewsController < ApplicationController
  load_and_authorize_resource
  before_action :set_news, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!, :except => [:index, :show]

  # GET /news
  # GET /news.json
  def index
    
    @news = News.all.where(:user_id => :author, :published => true).order(created_at: :desc).page params[:page]
    if @news.count == 0
      @news = nil
    end

    if user_signed_in?
      if current_user.role.name == "Admin"
        @news ||= News.all.order(created_at: :desc).page params[:page]
      else
        @news ||= News.all.where(:published => true).order(created_at: :desc).page params[:page]
      end
    else
      @news ||= News.all.where(:published => true).order(created_at: :desc).page params[:page]
    end
    
  end
  
  # GET /news/1
  # GET /news/1.json
  def show
  end

  # GET /news/new
  def new
    @news = News.new
  end

  # GET /news/1/edit
  def edit
  end

  # POST /news
  # POST /news.json
  def create
    @news = News.new(news_params)
    @news.preview = HTML_Truncator.truncate(@news.body, 100, :length_in_chars => true)
    @news.user = current_user

    respond_to do |format|
      if @news.save
        format.html { redirect_to @news, notice: 'News was successfully created.' }
        format.json { render :show, status: :created, location: @news }
      else
        format.html { render :new }
        format.json { render json: @news.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /news/1
  # PATCH/PUT /news/1.json
  def update
    @news.preview = HTML_Truncator.truncate(news_params[:body], 100, :length_in_chars => true)

    
    respond_to do |format|
      if @news.update(news_params)
        format.html { redirect_to @news, notice: 'News was successfully updated.' }
        format.json { render :show, status: :ok, location: @news }
      else
        format.html { render :edit }
        format.json { render json: @news.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /news/1
  # DELETE /news/1.json
  def destroy
    @news.destroy
    respond_to do |format|
      format.html { redirect_to news_index_url, notice: 'News was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_news
      @news = News.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def news_params
      params.require(:news).permit(:title, :body, :published)
    end
end
