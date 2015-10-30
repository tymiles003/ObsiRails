class News < ActiveRecord::Base
    paginates_per 6
    
    validates_presence_of :title, :body
    
    def prev
      News.where(["id < ?", id]).last
    end
    
    def next
      News.where(["id > ?", id]).first
    end
    
end
