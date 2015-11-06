class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :number
      t.string :title
      t.attachment :file
      t.references :music, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
