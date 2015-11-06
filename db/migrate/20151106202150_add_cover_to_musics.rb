class AddCoverToMusics < ActiveRecord::Migration
  def up
    add_attachment :musics, :cover
  end
  
  def down
    remove_attachment :musics, :cover
  end
end
