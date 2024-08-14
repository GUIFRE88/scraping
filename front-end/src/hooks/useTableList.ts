import { useState, useEffect } from 'react';
import { deleteProfile, fetchAllProfile, updateThisProfile } from '../services/profileService';
import { ProfileInterface } from '../types/profile.interface';
import { useCustomToast } from './useCustomToast';


export const useTableList = () => {
  const showToast = useCustomToast();
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOrView, setEditOrView] = useState<'view' | 'edit'>('view');
  const [filter, setFilter] = useState('');

  const fetchProfiles = () => {
    fetchAllProfile(filter)
      .then(response => {
        setProfiles(response);
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      });
  };

  const handleRemoveProfile = async (profile: ProfileInterface) => {
    try {
      const { status, message } = await deleteProfile(profile.id);
      if (status === 'success') {
        showToast('Exclusão de perfil', message, 'success');
        fetchProfiles();
      } else {
        showToast('Erro na exclusão de perfil', message, 'error');
      }
    } catch (error) {
      console.error('Erro ao excluir o registro:', error);
    }
  };

  const handleUpdateProfile = async (profile: ProfileInterface) => {
    try {
      const { status, message } = await updateThisProfile(profile.id, profile);
      if (status === 'success') {
        fetchProfiles();
        showToast('Perfil atualizado', message, 'success');
      } else {
        showToast('Erro ao atualizar o perfil', message, 'error');
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
    }
  };

  const handleFilterChange = () => {
    fetchProfiles();
  };

  const handleSetFilter = (e: React.FocusEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleModalProfile = (profileId: number) => {
    setSelectedProfileId(profileId);
    setEditOrView('view');
    setIsModalOpen(true);
  };

  const handleEditProfile = (profileId: number) => {
    setSelectedProfileId(profileId);
    setEditOrView('edit');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProfileId(null);
  };

  useEffect(() => {
    fetchProfiles();
  }, [filter]);

  return {
    profiles,
    selectedProfileId,
    isModalOpen,
    editOrView,
    handleRemoveProfile,
    handleUpdateProfile,
    handleFilterChange,
    handleSetFilter,
    handleModalProfile,
    handleEditProfile,
    handleCloseModal,
  };
};
