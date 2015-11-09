class PagesController < ApplicationController
  def show
    begin
      render params[:id]
    rescue ActionView::MissingTemplate
      render "404", :status => :not_fond
    end
  end
  
  def home
    @videos = Video.all.limit(3)
    @shows = Show.all.limit(5)
  end
  
end
