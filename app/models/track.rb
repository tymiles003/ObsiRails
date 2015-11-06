class Track < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug_candidates, use: [:slugged, :finders]

  belongs_to :music
  has_attached_file :file
  
  validates_attachment_content_type :file, :content_type => ['audio/mp3']

  def slug_candidates
    [
      :title,
      [:id, :title]
    ]
  end
  
end
