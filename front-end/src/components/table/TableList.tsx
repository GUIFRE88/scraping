import { DeleteIcon, HamburgerIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { Tooltip, Td,Tbody, Thead, Th, Tr, Table, TableContainer, TableCaption, Wrap, WrapItem, Avatar, Center, useToast } from '@chakra-ui/react';
import React from 'react';
import { Profile } from '../../types/profile.interface';



function TableList() {
  const toast = useToast();
  const profiles = [
    {id:1,username: 'Guilherme Freude',followers: 15000,following: 50,stars: 200,contributionsLastYear: 500,profileImage: 'https://bit.ly/dan-abramov',organization: 'Facebook',location: 'San Francisco, CA'},
    {id:1,username: 'Guilherme Freude',followers: 15000,following: 50,stars: 200,contributionsLastYear: 500,profileImage: 'https://bit.ly/dan-abramov',organization: 'Facebook',location: 'San Francisco, CA'},
    {id:1,username: 'Guilherme Freude',followers: 15000,following: 50,stars: 200,contributionsLastYear: 500,profileImage: 'https://bit.ly/dan-abramov',organization: 'Facebook',location: 'San Francisco, CA'},
    {id:1,username: 'Guilherme Freude',followers: 15000,following: 50,stars: 200,contributionsLastYear: 500,profileImage: 'https://bit.ly/dan-abramov',organization: 'Facebook',location: 'San Francisco, CA'},
    {id:1,username: 'Guilherme Freude',followers: 15000,following: 50,stars: 200,contributionsLastYear: 500,profileImage: 'https://bit.ly/dan-abramov',organization: 'Facebook',location: 'San Francisco, CA'},
    {id:1,username: 'Guilherme Freude',followers: 15000,following: 50,stars: 200,contributionsLastYear: 500,profileImage: 'https://bit.ly/dan-abramov',organization: 'Facebook',location: 'San Francisco, CA'},
    {id:1,username: 'Guilherme Freude',followers: 15000,following: 50,stars: 200,contributionsLastYear: 500,profileImage: 'https://bit.ly/dan-abramov',organization: 'Facebook',location: 'San Francisco, CA'},
    {id:1,username: 'Guilherme Freude',followers: 15000,following: 50,stars: 200,contributionsLastYear: 500,profileImage: 'https://bit.ly/dan-abramov',organization: 'Facebook',location: 'San Francisco, CA'},
  ]

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
        {profiles.map(profile => (
          <Tr key={profile.id}>
            <Td>{profile.username}</Td>
            <Td isNumeric>{profile.followers}</Td>
            <Td isNumeric>{profile.following}</Td>
            <Td isNumeric>{profile.stars}</Td>
            <Td isNumeric>{profile.contributionsLastYear}</Td>
            <Td>
              <Center>
                <Tooltip label={profile.profileImage}>
                  <Wrap>
                    <WrapItem>
                      <Avatar name={profile.username} src={profile.profileImage} />
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
