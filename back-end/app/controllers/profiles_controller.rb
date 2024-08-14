# frozen_string_literal: true

class ProfilesController < ApplicationController

  before_action :set_profile, only: [:show, :update, :destroy]

  def index
    render json: profile_service.all_profiles(params: params)
  end

  def show
    render json: @profile
  end

  def create
    begin
      render json: profile_service.create_profile(params: params)
    rescue StandardError => e
      render json: { status: 'error', message: "Erro ao criar o perfil: #{e.message}" }
    end
  end

  def update
    begin
      render json: profile_service.update_profile(params: params)
    rescue StandardError => e
      render json: { status: 'error', message: "Erro ao alterar o perfil: #{e.message}" }
    end
  end

  def destroy
    if @profile.destroy
      render json: { status: 'success', message: 'Perfil excluído com sucesso!' }
    else
      render json: { status: 'error', message: 'Falha ao excluir o perfil!' }
    end
  end

  private

  def set_profile
    @profile = Profile.find_by_id(params[:id])
  end

  def profile_params
    params.require(:profile).permit(:name, :email)
  end

  def profile_service
    @profile_service ||= ProfileService.new
  end

end
