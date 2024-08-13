class ChangeFollowersAndFollowingToFloat < ActiveRecord::Migration[7.0]
  def change
    change_column :profiles, :followers, :float
    change_column :profiles, :following, :float
    change_column :profiles, :stars, :float
    change_column :profiles, :contributions_last_year, :float
  end
end
