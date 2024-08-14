import { Box, Tooltip, Td, Tbody, Thead, Th, Tr, Table, TableContainer, Input, HStack, Center, Wrap, WrapItem, Avatar } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, HamburgerIcon, RepeatClockIcon, Search2Icon } from '@chakra-ui/icons'
import ModalView from '../modalView/ModalView'
import ModalInclude from '../modalInclude/ModalInclude'
import { useTableList } from '../../hooks/useTableList'

function TableList() {
  const {
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
  } = useTableList()

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <HStack spacing={4} mb={4}>
          <Input
            placeholder='Filtrar perfis'
            onChange={handleSetFilter}
            width='auto'
          />
          <ModalInclude refreshProfiles={handleFilterChange} />
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
                      <RepeatClockIcon cursor='pointer' />
                    </Tooltip>
                  </Td>
                  <Td onClick={() => handleModalProfile(profile.id)}>
                    <Tooltip label="Visualizar perfil do GitHub">
                      <HamburgerIcon cursor='pointer' />
                    </Tooltip>
                  </Td>
                  <Td onClick={() => handleEditProfile(profile.id)}>
                    <Tooltip label="Editar perfil do Github">
                      <EditIcon cursor='pointer' />
                    </Tooltip>
                  </Td>
                  <Td onClick={() => handleRemoveProfile(profile)}>
                    <Tooltip label="Excluir perfil do GitHub da listagem">
                      <DeleteIcon cursor='pointer' />
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
          refreshProfiles={handleFilterChange}
        />
      )}
    </>
  )
}

export default TableList
