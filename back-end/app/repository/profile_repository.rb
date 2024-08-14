# frozen_string_literal: true

require 'nokogiri'
require 'httparty'
require 'bitly'

class ProfileRepository

  def all_profiles(params:)
    if params[:filter].present?
      search_query = "%#{params[:filter]}%"
      profile_table = Profile.arel_table

      query = profile_table[:name].matches(search_query)
              .or(profile_table[:link].matches(search_query))
              .or(profile_table[:organization].matches(search_query))
              .or(profile_table[:location].matches(search_query))

      @profiles = Profile.where(query)
    else
      @profiles = Profile.all
    end
  end

  def create_profile(params:)
    return error_message unless valid_params?(params)

    data = scrapping_values(name: params[:name], link: params[:link])

    @profile = Profile.new(
      name: data[:name],
      link: short_url(data[:link]),
      followers: data[:followers],
      following: data[:following],
      stars: data[:stars],
      contributions_last_year: data[:contributions_last_year],
      profile_image: data[:profile_image],
      organization: data[:organization],
      location: data[:location],
      nick_name: data[:nick_name]
    )

    if @profile.save
      return { status: 'success', message: 'Perfil criado com sucesso' }
    else
      return { status: 'error', message: @profile.errors.full_messages.to_sentence }
    end
  end

  def update_profile(params:)

    @profile = Profile.find_by_id(params[:id])

    return profile_not_found unless @profile.present?
 
    name = params[:name].present? ? params[:name] : @profile.name
    link = params[:link].present? ? params[:link] : @profile.link
    data = scrapping_values(name: name, link: link)

    if @profile.update(
      name: data[:name],
      link: short_url(data[:link]),
      followers: data[:followers],
      following: data[:following],
      stars: data[:stars],
      contributions_last_year: data[:contributions_last_year],
      profile_image: data[:profile_image],
      organization: data[:organization],
      location: data[:location],
      nick_name: data[:nick_name]
    )
      { status: 'success', message: 'Perfil alterado com sucesso' }
    else
      { status: 'error', message: @profile.errors.full_messages.to_sentence }
    end

  end

  private

  def valid_params?(params)
    params[:name].present? && params[:link].present?
  end

  def error_message
    { status: 'error', message: 'Nome e Link são obrigatórios!' }
  end

  def profile_not_found
    { status: 'error', message: 'Perfil não encontrado.' }
  end

  def short_url(link)
    return link if is_bitly_link?(link)

    bitly = Bitly::API::Client.new(token: 'c549c653fe4f9d91a7bc3160ed4805e36da30a16')
    short_url = bitly.shorten(long_url: link)
    short_url.link
  end

  def is_bitly_link?(link)
    !!(link =~ /bit\.ly/)
  end

  def scrapping_values(name:, link:)
    response = HTTParty.get(link)
    doc = Nokogiri::HTML(response.body)

    {
      name: name,
      link: link,
      followers: doc.at_css('span.text-bold.color-fg-default')&.text&.strip.to_f,
      following: doc.at_css('a[href*="tab=following"] span.text-bold.color-fg-default')&.text&.strip.to_f,
      stars: doc.at_css('a[data-tab-item="stars"]')&.css('span.Counter')&.last&.text&.strip.to_f,
      contributions_last_year: doc.at_css('.f4.text-normal.mb-2')&.text&.strip.to_f,
      profile_image: doc.at_css('img.avatar-user')&.[]('src') || '',
      organization: doc.at_css('.p-org')&.text&.strip || 'N/A',
      location: doc.at_css('.p-label')&.text&.strip || 'N/A',
      nick_name: doc.at_css('span.p-nickname')&.text&.strip || 'N/A'
    }
  end
end


  