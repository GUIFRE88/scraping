import axios from "axios";
import { ProfileInterface } from '../types/profile.interface'

const API_URL = 'http://0.0.0.0:3000/profiles'

export const createProfile = async (name: string, link: string) => {
  try {
    const response = await axios.post(API_URL, { name, link });
    return response.data
  } catch (error) {
    throw new Error('Erro ao adicionar perfil.')
  }
}

export const fetchProfile = async (profileId: number): Promise<ProfileInterface> => {
  const response = await axios.get<ProfileInterface>(`${API_URL}/${profileId}`);
  return response.data;
}

export const updateProfile = async (profileId: number, profileData: Partial<ProfileInterface>): Promise<void> => {
  await axios.put(`${API_URL}/${profileId}`, profileData);
}