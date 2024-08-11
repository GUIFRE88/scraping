class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.string :name
      t.integer :followers
      t.integer :following
      t.integer :stars
      t.integer :contributions_last_year
      t.string :profile_image
      t.string :organization
      t.string :location

      t.timestamps
    end
  end
end
