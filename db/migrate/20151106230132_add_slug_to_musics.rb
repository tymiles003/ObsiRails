class AddSlugToMusics < ActiveRecord::Migration
  def change
    add_column :musics, :slug, :string, unique: true
    add_index :musics, :slug, unique: true
  end
end
