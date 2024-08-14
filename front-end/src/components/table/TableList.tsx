import { DeleteIcon, EditIcon, HamburgerIcon, RepeatClockIcon, Search2Icon, SearchIcon } from '@chakra-ui/icons';
import { Box, Tooltip, Td,Tbody, Thead, Th, Tr, Table, TableContainer, TableCaption, Wrap, WrapItem, Avatar, Center, useToast, Input, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ProfileInterface } from '../../types/profile.interface';
import axios from 'axios';
import ModalView from '../modalView/ModalView';
import ModalInclude from '../modal/ModalInclude';

function TableList() {
  const toast = useToast()
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOrView, setEditOrView] = useState('view')  
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchProfiles();
  }, []);


  const fetchProfiles = () => {
    axios.get<ProfileInterface[]>(`http://0.0.0.0:3000/profiles?filter=${filter}`)
      .then(response => {
        setProfiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      });
  };

  const handleRemoveProfile = (profile: ProfileInterface) => {
    axios.delete(`http://0.0.0.0:3000/profiles/${profile.id}`)
    .then(response => {
      const { status, message } = response.data;
      if (status === 'success') {
        setProfiles(prevProfiles => prevProfiles.filter(p => p.id !== profile.id))
        toast({
          title: 'Exclusão de perfil',
          description: message,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:'bottom-right',
        })
      } else {
        toast({
          title: 'Erro na exclusão de perfil',
          description: message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position:'bottom-right',
        })
      }
    })
    .catch(error => {
      console.error('Erro ao excluir o registro:', error)
    })
  }

  const handleModalProfile = (profileId: number) => {
    setSelectedProfileId(profileId);
    setEditOrView('view')
    setIsModalOpen(true);
  };

  const handleEditProfile = (profileId: number) => {
    setSelectedProfileId(profileId);
    setEditOrView('edit')
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProfileId(null);
  };

  const handleUpdateProfile = async (profile: ProfileInterface) => {
    axios.put(`http://0.0.0.0:3000/profiles/${profile.id}`)
    .then(response => {
      const { status, message } = response.data;
      if (status === 'success') {
        setProfiles(prevProfiles => prevProfiles.filter(p => p.id !== profile.id))
        toast({
          title: 'Perfil atualizado.',
          description: 'As informações do perfil foram atualizadas com sucesso.',
          status: status,
          duration: 5000,
          isClosable: true,
          position:'bottom-right',
        })
        fetchProfiles()
      } else {
        toast({
          title: 'Erro ao atualizar o perfil',
          description: message,
          status: status,
          duration: 5000,
          isClosable: true,
          position:'bottom-right',
        })
      }
    })
    .catch(error => {
      console.error('Erro ao excluir o registro:', error)
    })
  };

  const handleFilterChange = () =>{
    fetchProfiles();
  }

  const handleSetFilter = (e: React.FocusEvent<HTMLInputElement>) =>{
    setFilter(e.target.value)
  }


  return (
    <>
    <Box display="flex" justifyContent="flex-end" mb={2}>
    <HStack spacing={4} mb={4}>
      <Input
        placeholder='Filtrar perfis'
        onChange={handleSetFilter}
        width='auto'
        value={filter}
      />
      <Search2Icon cursor='pointer' onClick={handleFilterChange}/>
      <ModalInclude refreshProfiles={fetchProfiles} />
      </HStack>
    </Box>
    <Box color='black'>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Apelido</Th>
              <Th>Nº de Followers</Th>
              <Th>Nº de Following</Th>
              <Th>Nº de Stars</Th>
              <Th>Nº de contribuições</Th>
              <Th>Imagem de perfil</Th>
              <Th>Organização</Th>
              <Th>Localização</Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
          {profiles.map(profile => (
            <Tr key={profile.id}>
              <Td>{profile.name}</Td>
              <Td>{profile.nick_name}</Td>
              <Td isNumeric>{profile.followers}</Td>
              <Td isNumeric>{profile.following}</Td>
              <Td isNumeric>{profile.stars}</Td>
              <Td isNumeric>{profile.contributions_last_year}</Td>
              <Td>
                <Center>
                  <Tooltip label={profile.profile_image}>
                    <Wrap>
                      <WrapItem>
                        <Avatar name={profile.name} src={profile.profile_image} />
                      </WrapItem>
                    </Wrap>
                  </Tooltip>
                </Center>
              </Td>
              <Td>{profile.organization}</Td>
              <Td>{profile.location}</Td>
              <Td onClick={() => handleUpdateProfile(profile)}>
                <Tooltip label="Atualizar perfil do GitHub">
                  <RepeatClockIcon cursor='pointer'/>
                </Tooltip>
              </Td>
              <Td onClick={() => handleModalProfile(profile.id)}>
                <Tooltip label="Visualizar perfil do GitHub">
                  <HamburgerIcon cursor='pointer'/>
                </Tooltip>
              </Td>
              <Td onClick={() => handleEditProfile(profile.id)}>
                <Tooltip label="Editar perfil do Github">
                  <EditIcon cursor='pointer'/>
                </Tooltip>
              </Td>
              <Td onClick={() => handleRemoveProfile(profile)}>
                <Tooltip label="Excluir perfil do GitHub da listagem">
                  <DeleteIcon cursor='pointer'/>
                </Tooltip>
              </Td>
            </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
    {selectedProfileId !== null && (
        <ModalView 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          profileId={selectedProfileId} 
          action={editOrView}
          refreshProfiles={fetchProfiles}
        />
      )}
    </>
    )
}


export default TableList;
