class AddAttachmentToImages < ActiveRecord::Migration
  def up
    add_attachment :images, :file
  end
  
  def down
    remove_attachment :images, :file
  end
end
