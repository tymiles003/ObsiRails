class News < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  
  belongs_to :user  
  validates_presence_of :title, :body
  paginates_per 6

  def prev
    News.where(["id < ?", id]).last
  end
    
  def next
    News.where(["id > ?", id]).first
  end
  
  def slug_candidates
    [[:id, :title]]
  end
end
