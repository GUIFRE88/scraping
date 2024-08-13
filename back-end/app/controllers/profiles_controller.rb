require 'nokogiri'
require 'httparty'

class ProfilesController < ApplicationController

  before_action :set_profile, only: [:show, :update, :destroy]

  def index
    render json: Profile.all
  end

  def show
    render json: @profile
  end

  def create
    # Extrair os parâmetros da requisição
    name = params[:name]
    link = params[:link]

    # Verificar se a URL do GitHub começa com 'https://github.com/'
    unless link.start_with?('https://github.com/')
      render json: { status: 'error', message: 'URL do GitHub inválida' }, status: :unprocessable_entity
      return
    end

    # Fazer uma requisição HTTP para a página do GitHub
    begin
      response = HTTParty.get(link)
      doc = Nokogiri::HTML(response.body)

      # Extrair informações da página
      followers = doc.at_css('a[href$="/followers"]')&.text&.strip.to_i
      following = doc.at_css('a[href$="/following"]')&.text&.strip.to_i
      stars = doc.at_css('a[href$="/stars"]')&.text&.strip.to_i
      contributions_last_year = doc.at_css('.js-yearly-contributions')&.text&.strip.to_i
      profile_image = doc.at_css('img.avatar-user')&.[]('src') || ''
      organization = doc.at_css('a[data-hovercard-type="organization"]')&.text&.strip || 'N/A'
      location = doc.at_css('.p-label')&.text&.strip || 'N/A'

      # Criar o perfil com os dados extraídos
      @profile = Profile.new(
        name: name,
        link: link,
        followers: followers,
        following: following,
        stars: stars,
        contributions_last_year: contributions_last_year,
        profile_image: profile_image,
        organization: organization,
        location: location
      )

      if @profile.save
        render json: { status: 'success', message: 'Perfil criado com sucesso' }, status: :created
      else
        render json: { status: 'error', message: @profile.errors.full_messages.to_sentence }, status: :unprocessable_entity
      end

    rescue StandardError => e
      render json: { status: 'error', message: "Erro ao buscar informações: #{e.message}" }, status: :unprocessable_entity
    end
  end

  def update
    # Extrair os parâmetros da requisição
    @profile = Profile.find_by_id(params[:id])
    if @profile.present?

      name = @profile.name
      link = @profile.link

      begin
        response = HTTParty.get(link)
        doc = Nokogiri::HTML(response.body)

        # Extrair informações da página
        followers = doc.at_css('a[href$="/followers"]')&.text&.strip.to_i
        following = doc.at_css('a[href$="/following"]')&.text&.strip.to_i
        stars = doc.at_css('a[href$="/stars"]')&.text&.strip.to_i
        contributions_last_year = doc.at_css('.js-yearly-contributions')&.text&.strip.to_i
        profile_image = doc.at_css('img.avatar-user')&.[]('src') || ''
        organization = doc.at_css('a[data-hovercard-type="organization"]')&.text&.strip || 'N/A'
        location = doc.at_css('.p-label')&.text&.strip || 'N/A'
       
        
          @profile.update(
            name: name,
            followers: followers,
            following: following,
            stars: stars,
            contributions_last_year: contributions_last_year,
            profile_image: profile_image,
            organization: organization,
            location: location
          )

          if @profile.save
            render json: { status: 'success', message: 'Perfil criado com sucesso' }, status: :created
          else
            render json: { status: 'error', message: @profile.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end

      rescue StandardError => e
        render json: { status: 'error', message: "Erro ao buscar informações: #{e.message}" }, status: :unprocessable_entity
      end
    else
      # Perfil não encontrado
      render json: { status: 'error', message: 'Perfil não encontrado.' }, status: :not_found
    end

  end

  def destroy
    if @profile.destroy
      render json: { status: 'success', message: 'Perfil excluído com sucesso!' }, status: :ok
    else
      render json: { status: 'error', message: 'Falha ao excluir o perfil!' }, status: :unprocessable_entity
    end
  end

  private

  def set_profile
    @profile = Profile.find_by_id(params[:id])
  end

  def profile_params
    params.require(:profile).permit(:name, :email)
  end


end
