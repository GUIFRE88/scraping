import React, { useEffect, useState } from 'react';
import { Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Box, Avatar, useDisclosure, Divider, Link } from '@chakra-ui/react';
import axios from 'axios';
import { Profile } from '../../types/profile.interface';

interface ModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: number;
}

const ModalView: React.FC<ModalViewProps> = ({ isOpen, onClose, profileId }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (profileId !== null) {
      axios.get<Profile>(`http://0.0.0.0:3000/profiles/${profileId}`)
        .then(response => {
          setProfile(response.data);
        })
        .catch(error => {
          console.error('Erro ao visualizar o perfil:', error);
        });
    }
  }, [profileId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Detalhes do Perfil</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {profile ? (
          <Box>
            <Center>
              <Avatar size='2xl' name={profile.name} src={profile.profile_image} mb={4} />
            </Center>
            <Text padding='10px'><strong>Nome:</strong> {profile.name}</Text>
            <Text padding='10px'><strong>Followers:</strong> {profile.followers}</Text>
            <Text padding='10px'><strong>Following:</strong> {profile.following}</Text>
            <Text padding='10px'><strong>Stars:</strong> {profile.stars}</Text>
            <Text padding='10px'><strong>Contribuições no Último Ano:</strong> {profile.contributions_last_year}</Text>
            <Text padding='10px'><strong>Organização:</strong> {profile.organization}</Text>
            <Text padding='10px'><strong>Localização:</strong> {profile.location}</Text>
            <Text padding='10px'>
              <Text as="span" fontWeight="bold">Link:</Text>{' '}
              <Link href={profile.link} isExternal color='teal.500'>
                {profile.link}
              </Link>
            </Text>
          </Box>
        ) : (
          <Text>Carregando...</Text>
        )}
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Fechar
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
};

export default ModalView;
