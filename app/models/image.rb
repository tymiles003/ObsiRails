class Image < ActiveRecord::Base
  belongs_to :photo
  has_attached_file :file, styles: { thumb: "100x100>", medium: "400x400>" }
  validates_attachment_content_type :file, content_type: /\Aimage\/.*\Z/
end
