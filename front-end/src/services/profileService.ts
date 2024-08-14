import axios from "axios";

const API_URL = 'http://0.0.0.0:3000/profiles';

export const createProfile = async (name: string, link: string) => {
  try {
    const response = await axios.post(API_URL, { name, link });
    return response.data
  } catch (error) {
    throw new Error('Erro ao adicionar perfil.')
  }
};
