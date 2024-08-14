require 'rails_helper'

RSpec.describe ProfileService, type: :service do
  let(:service) { described_class.new }
  let(:profile_repository) { instance_double(ProfileRepository) }
  let(:profile) { create(:profile) }
  
  before do
    # Configura o ProfileRepository para ser um double e retorna o profile quando chamado
    allow(ProfileRepository).to receive(:new).and_return(profile_repository)
  end

  describe '#all_profiles' do
    context 'when in test environment' do
      before do
        allow(Rails.env).to receive(:test?).and_return(true)
      end

      it 'returns a test profile' do
        result = service.all_profiles(params: {})
        expect(result).to eq({ name: 'Test Profile', link: 'http://test.com' })
      end
    end

    context 'when not in test environment' do
      before do
        allow(Rails.env).to receive(:test?).and_return(false)
      end

      it 'calls ProfileRepository#all_profiles' do
        params = { filter: 'test' }
        expect(profile_repository).to receive(:all_profiles).with(params: params).and_return([profile])

        result = service.all_profiles(params: params)

        expect(result).to include(profile)
      end
    end
  end

  describe '#create_profile' do
    it 'calls ProfileRepository#create_profile' do
      params = { name: 'Test Name', link: 'http://example.com' }
      expect(profile_repository).to receive(:create_profile).with(params: params).and_return({ status: 'success', message: 'Perfil criado com sucesso' })

      result = service.create_profile(params: params)

      expect(result[:status]).to eq('success')
      expect(result[:message]).to eq('Perfil criado com sucesso')
    end
  end

  describe '#update_profile' do
    it 'calls ProfileRepository#update_profile' do
      params = { id: profile.id, name: 'Updated Name' }
      expect(profile_repository).to receive(:update_profile).with(params: params).and_return({ status: 'success', message: 'Perfil alterado com sucesso' })

      result = service.update_profile(params: params)

      expect(result[:status]).to eq('success')
      expect(result[:message]).to eq('Perfil alterado com sucesso')
    end
  end
end
