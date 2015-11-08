json.array!(@shows) do |show|
  json.extract! show, :id, :title, :place, :date, :address_state, :address_town, :address_street, :phone, :website, :ticket_price, :ticket_link, :subscribe_ical, :subscribe_google, :description, :google_map
  json.url show_url(show, format: :json)
end
