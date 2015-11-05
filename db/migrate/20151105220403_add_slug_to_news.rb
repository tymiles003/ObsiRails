class AddSlugToNews < ActiveRecord::Migration
  def change
    add_column :news, :slug, :string, unique: true
    add_index :news, :slug, unique: true
  end
end
