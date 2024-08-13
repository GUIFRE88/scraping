class AddLinkToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :link, :string
  end
end
