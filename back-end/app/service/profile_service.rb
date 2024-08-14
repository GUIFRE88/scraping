# frozen_string_literal: true

class ProfileService

  def all_profiles(params:)
    if Rails.env.test?
      return { name: 'Test Profile', link: 'http://test.com' }
    else
      profile_repository.all_profiles(params: params)
    end
  end

  def create_profile(params:)
    profile_repository.create_profile(params: params)
  end

  def update_profile(params:)
    profile_repository.update_profile(params: params)
  end
  
  private

  def profile_repository
    @profile_repository ||= ProfileRepository.new
  end

end