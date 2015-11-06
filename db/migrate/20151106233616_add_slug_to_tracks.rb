class AddSlugToTracks < ActiveRecord::Migration
  def change
    add_column :tracks, :slug, :string, unique: true
    add_index :tracks, :slug, unique: true
  end
end
