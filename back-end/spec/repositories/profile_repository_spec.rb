# spec/repositories/profile_repository_spec.rb

require 'rails_helper'

RSpec.describe ProfileRepository, type: :repository do
  let(:repository) { described_class.new }
  let!(:profile) { create(:profile) } # Supondo que você tenha uma factory para Profile

  describe '#all_profiles' do
    context 'when filter is present' do
      it 'returns profiles matching the filter' do
        filter = profile.name
        result = repository.all_profiles(params: { filter: filter })
        expect(result).to include(profile)
      end
    end

    context 'when filter is not present' do
      it 'returns all profiles' do
        result = repository.all_profiles(params: { filter: '' })
        expect(result).to include(profile)
      end
    end
  end
  describe '#valid_params?' do
    it 'returns true when name and link are present' do
      params = { name: 'Test Name', link: 'http://example.com' }
      result = repository.send(:valid_params?, params)
      expect(result).to be true
    end

    it 'returns false when name is missing' do
      params = { name: '', link: 'http://example.com' }
      result = repository.send(:valid_params?, params)
      expect(result).to be false
    end

    it 'returns false when link is missing' do
      params = { name: 'Test Name', link: '' }
      result = repository.send(:valid_params?, params)
      expect(result).to be false
    end

    it 'returns false when both name and link are missing' do
      params = { name: '', link: '' }
      result = repository.send(:valid_params?, params)
      expect(result).to be false
    end
  end

  describe '#error_message' do
    it 'returns the expected error message' do
      result = repository.send(:error_message)
      expect(result).to eq({ status: 'error', message: 'Nome e Link são obrigatórios!' })
    end
  end

  describe '#profile_not_found' do
    it 'returns the expected profile not found message' do
      result = repository.send(:profile_not_found)
      expect(result).to eq({ status: 'error', message: 'Perfil não encontrado.' })
    end
  end
  
end
