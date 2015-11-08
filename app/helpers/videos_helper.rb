module VideosHelper
  
  def embed(id)
    content_tag(:iframe, nil, src: "//www.youtube.com/embed/#{id}", frameborder: 0)
  end
  
  def thumb(id)
    content_tag(:img, nil, src: "//img.youtube.com/vi/#{id}/hqdefault.jpg")
  end
  
end
