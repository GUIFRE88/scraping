# spec/models/profile_spec.rb
require 'rails_helper'

RSpec.describe Profile, type: :model do
  # Define uma fábrica para criar perfis
  let(:profile) { build(:profile) }

  context 'validations' do
    it 'is valid with valid attributes' do
      expect(profile).to be_valid
    end

    it 'is not valid without a name' do
      profile.name = nil
      expect(profile).to_not be_valid
    end

    it 'is not valid without a profile_image' do
      profile.profile_image = nil
      expect(profile).to_not be_valid
    end
  end
end
