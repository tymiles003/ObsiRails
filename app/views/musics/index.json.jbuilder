json.array!(@musics) do |music|
  json.extract! music, :id, :title, :release
  json.url music_url(music, format: :json)
end
