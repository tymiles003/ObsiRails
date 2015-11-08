class CreateShows < ActiveRecord::Migration
  def change
    create_table :shows do |t|
      t.string :title
      t.string :place
      t.datetime :date
      t.string :address_state
      t.string :address_town
      t.string :address_street
      t.string :phone
      t.string :website
      t.string :ticket_price
      t.string :ticket_link
      t.attachment :subscribe_ical
      t.string :subscribe_google
      t.string :description
      t.string :google_map

      t.timestamps null: false
    end
  end
end
