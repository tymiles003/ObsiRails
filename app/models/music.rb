class Music < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug_candidates, use: [:slugged, :finders]
  
  has_many :tracks
  has_attached_file :cover, styles: { thumb: "300x300#" }
  validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/
  accepts_nested_attributes_for :tracks, allow_destroy: true
  
  def slug_candidates
    [
      :title,
      [:id, :title]
      ]
  end

end
