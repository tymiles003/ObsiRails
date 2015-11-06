json.array!(@images) do |image|
  json.extract! image, :id, :photo_id
  json.url image_url(image, format: :json)
end
