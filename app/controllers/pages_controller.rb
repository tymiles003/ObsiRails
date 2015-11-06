class PagesController < ApplicationController
  def show
    begin
      render params[:id]
    rescue ActionView::MissingTemplate
      render "404", :status => :not_fond
    end
  end
end
