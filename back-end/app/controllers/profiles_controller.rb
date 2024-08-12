class ProfilesController < ApplicationController

  before_action :set_profile, only: [:show, :destroy]

  def index
    render json: Profile.all
  end

  def show
    render json: @profile
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
