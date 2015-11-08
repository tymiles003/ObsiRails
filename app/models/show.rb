class Show < ActiveRecord::Base
  has_attached_file :subscribe_ical
  validates_attachment_content_type :subscribe_ical, content_type: /\Aimage\/.*\Z/
end
