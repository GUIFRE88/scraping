class AddIndexesToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_index :profiles, :name
    add_index :profiles, :organization
    add_index :profiles, :location
    add_index :profiles, :link
  end
end
