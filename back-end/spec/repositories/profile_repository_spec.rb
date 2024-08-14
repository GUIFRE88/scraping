require 'rails_helper'
require 'faker'

RSpec.describe ProfileRepository, type: :repository do
  let(:repository) { described_class.new }
  let(:profile) { create(:profile) }
  let(:bitly_client) { instance_double(Bitly::API::Client) }
  
  before do
    allow(Bitly::API::Client).to receive(:new).and_return(bitly_client)
  end

  describe '#all_profiles' do
    context 'when filter is present' do
      it 'returns profiles matching the filter' do
        filter = profile.name
        result = repository.all_profiles(params: { filter: filter })
        expect(result).to include(profile)
      end

      it 'returns no profiles if no matches' do
        filter = 'NonExistentProfile'
        result = repository.all_profiles(params: { filter: filter })
        expect(result).to be_empty
      end
    end

    context 'when filter is not present' do
      it 'returns all profiles' do
        result = repository.all_profiles(params: { filter: '' })
        expect(result).to include(profile)
      end
    end
  end

  describe '#create_profile' do
    let(:valid_params) do
      {
        name: 'Test Name',
        link: 'http://example.com'
      }
    end

    let(:scrapping_data) do
      {
        name: 'Test Name',
        link: 'http://example.com',
        followers: 1000.0,
        following: 500.0,
        stars: 200.0,
        contributions_last_year: 50.0,
        profile_image: 'http://example.com/image.jpg',
        organization: 'Example Org',
        location: 'Example Location',
        nick_name: 'example_nick'
      }
    end

    before do
      allow(repository).to receive(:scrapping_values).with(name: valid_params[:name], link: valid_params[:link]).and_return(scrapping_data)
      allow(repository).to receive(:short_url).and_return(valid_params[:link])
    end

    context 'with valid parameters' do
      it 'creates a new profile' do
        result = repository.create_profile(params: valid_params)

        expect(result[:status]).to eq('success')
        expect(result[:message]).to eq('Perfil criado com sucesso')
        expect(Profile.last.name).to eq(valid_params[:name])
        expect(Profile.last.link).to eq(valid_params[:link])
        expect(Profile.last.followers).to eq(scrapping_data[:followers])
      end
    end

    context 'with invalid parameters' do
      it 'returns an error message' do
        invalid_params = { name: '', link: '' }
        allow(repository).to receive(:valid_params?).with(invalid_params).and_return(false)
        
        result = repository.create_profile(params: invalid_params)

        expect(result[:status]).to eq('error')
        expect(result[:message]).to eq('Nome e Link são obrigatórios!')
      end
    end

    context 'when profile creation fails' do
      before do
        allow_any_instance_of(Profile).to receive(:save).and_return(false)
        allow_any_instance_of(Profile).to receive_message_chain(:errors, :full_messages, :to_sentence).and_return('Erro ao salvar o perfil')
      end

      it 'returns an error message when profile creation fails' do
        result = repository.create_profile(params: valid_params)

        expect(result[:status]).to eq('error')
        expect(result[:message]).to eq('Erro ao salvar o perfil')
      end
    end
  end

  describe '#update_profile' do
    let(:new_name) { 'Updated Name' }
    let(:scrapping_data) do
      {
        name: new_name,
        link: profile.link,
        followers: 1000.0,
        following: 500.0,
        stars: 200.0,
        contributions_last_year: 50.0,
        profile_image: 'http://example.com/image.jpg',
        organization: 'Updated Org',
        location: 'Updated Location',
        nick_name: 'updated_nick'
      }
    end

    let(:valid_params) do
      {
        id: profile.id,
        name: new_name,
        link: profile.link
      }
    end

    before do
      allow(repository).to receive(:scrapping_values).with(name: new_name, link: profile.link).and_return(scrapping_data)
      allow(repository).to receive(:short_url).and_return(profile.link)
    end

    context 'when profile exists' do
      it 'updates the profile' do
        result = repository.update_profile(params: valid_params)

        expect(result[:status]).to eq('success')
        expect(result[:message]).to eq('Perfil alterado com sucesso')
        expect(profile.reload.name).to eq(new_name)
      end
    end

    context 'when profile does not exist' do
      it 'returns a profile not found message' do
        result = repository.update_profile(params: { id: 99999, name: new_name, link: profile.link })
        expect(result[:status]).to eq('error')
        expect(result[:message]).to eq('Perfil não encontrado.')
      end
    end
  end

  describe '#short_url' do
    let(:long_url) { 'http://example.com/long-url' }

    context 'when the URL is not a Bitly link' do
      it 'shortens the URL using Bitly' do
        allow(bitly_client).to receive(:shorten).with(long_url: long_url).and_return(double(link: 'http://bit.ly/short-url'))

        result = repository.send(:short_url, long_url)

        expect(result).to eq('http://bit.ly/short-url')
      end
    end

    context 'when the URL is already a Bitly link' do
      let(:bitly_url) { 'http://bit.ly/some-bitly-url' }

      it 'returns the URL unchanged' do
        result = repository.send(:short_url, bitly_url)

        expect(result).to eq(bitly_url)
      end
    end
  end

  describe '#scrapping_values' do
    let(:url) { 'http://example.com' }
    let(:html_response) { "<html><body><span class='text-bold color-fg-default'>1000</span></body></html>" }
    
    before do
      stub_request(:get, url).to_return(body: html_response)
    end

    it 'parses values from the HTML response' do
      result = repository.send(:scrapping_values, name: 'Test Name', link: url)

      expect(result[:followers]).to eq(1000.0)
    end
  end
end
