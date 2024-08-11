import { DeleteIcon, HamburgerIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { Tooltip, Td,Tbody, Thead, Th, Tr, Table, TableContainer, TableCaption, Wrap, WrapItem, Avatar, Center, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Profile } from '../../types/profile.interface';
import axios from 'axios';




function TableList() {
  const toast = useToast()
  const [profiles, setProfiles] = useState<Profile[]>([]);


  useEffect(() => {
    axios.get<Profile[]>('http://0.0.0.0:3000/profiles')
      .then(response => {
        setProfiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      });
  }, []);

  const handleRemoveProfile = (profile: Profile) => {
    toast({
      title: 'Excluir',
      description: 'Excluir o perfil',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position:'bottom-right',
    })
  }

  const handleModalProfile = (profile: Profile) => {
    toast({
      title: 'Modal aberto',
      description: 'Modal aberto',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position:'bottom-right',
    })
  }
  const handleUpdateProfile = async (profile: Profile) => {
    toast({
      title: 'Perfil atualizado.',
      description: 'As informações do perfil foram atualizadas com sucesso.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position:'bottom-right',
    })
  };

  return (
    <>
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            <Th>Nome de usuário do Github</Th>
            <Th>Nº de Followers</Th>
            <Th>Nº de Following</Th>
            <Th>Nº de Stars</Th>
            <Th>Nº de contribuições no último ano</Th>
            <Th>Imagem de perfil</Th>
            <Th>Organização</Th>
            <Th>Localização</Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
        console.log(profiles)
        {profiles.map(profile => (
          <Tr key={profile.id}>
            <Td>{profile.name}</Td>
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
                <RepeatClockIcon />
              </Tooltip>
            </Td>
            <Td onClick={() => handleModalProfile(profile)}>
              <Tooltip label="Visualizar perfil do GitHub">
                <HamburgerIcon />
              </Tooltip>
            </Td>
            <Td onClick={() => handleRemoveProfile(profile)}>
              <Tooltip label="Excluir perfil do GitHub da listagem">
                <DeleteIcon />
              </Tooltip>
            </Td>
          </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </>
    )
}


export default TableList;
