class Profile < ApplicationRecord
  
  validates :name, :profile_image, presence: true
 
end
