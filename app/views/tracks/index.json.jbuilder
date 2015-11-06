json.array!(@tracks) do |track|
  json.extract! track, :id, :number, :title, :file, :music_id
  json.url track_url(track, format: :json)
end
