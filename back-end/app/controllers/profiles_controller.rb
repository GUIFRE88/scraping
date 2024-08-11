class ProfilesController < ApplicationController

  def index
    puts 'Bateu aquiii'
    render json: Profile.all
  end

  private

  def set_profile
    @profile = Profile.find(params[:id])
  end

  def profile_params
    params.require(:profile).permit(:name, :email)
  end


end
