class News < ActiveRecord::Base
  belongs_to :user  
  validates_presence_of :title, :body
  paginates_per 6

  def prev
    News.where(["id < ?", id]).last
  end
    
  def next
    News.where(["id > ?", id]).first
  end
    
end
