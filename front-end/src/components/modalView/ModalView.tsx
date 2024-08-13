import { 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Box, 
  Center, 
  Avatar, 
  Text, 
  Link, 
  Flex 
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Profile } from "../../types/profile.interface";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId?: number; // ID do perfil para editar ou visualizar
  action: string; // Define a ação: 'view' ou 'edit'
}

function ModalInclude({ isOpen, onClose, profileId, action }: ModalProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [link, setLink] = useState('');
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [contributionsLastYear, setContributionsLastYear] = useState<number>(0);
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (profileId !== undefined) {
      axios.get<Profile>(`http://0.0.0.0:3000/profiles/${profileId}`)
        .then(response => {
          const data = response.data;
          setProfile(data);
          setName(data.name);
          setLink(data.link);
          setNick(data.nick_name)
          setFollowers(data.followers);
          setFollowing(data.following);
          setStars(data.stars);
          setContributionsLastYear(data.contributions_last_year);
          setOrganization(data.organization);
          setLocation(data.location);
        })
        .catch(error => {
          console.error('Erro ao visualizar o perfil:', error);
        });
    }
  }, [profileId]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleFollowersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFollowers(Number(e.target.value));
  };

  const handleNickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNick(e.target.value);
  };

  const handleFollowingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFollowing(Number(e.target.value));
  };

  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStars(Number(e.target.value));
  };

  const handleContributionsLastYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContributionsLastYear(Number(e.target.value));
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganization(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('aaaaaaaaaaaaaaaaaaaaaa')
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{action === 'edit' ? 'Editar Perfil' : 'Detalhes do Perfil'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {profile ? (
            <form onSubmit={handleSubmit}>
              <Box>
                <Center>
                  <Avatar size='2xl' name={profile.name} src={profile.profile_image} mb={4} />
                </Center>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Nome:</FormLabel>
                    <Input
                      value={name}
                      onChange={handleNameChange}
                      placeholder='Nome'
                      isDisabled={action === 'view'} // Desativa o campo se estiver no modo de visualização
                      flex='1'
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Link:</FormLabel>
                    <Input
                      value={link}
                      onChange={handleLinkChange}
                      placeholder='Link'
                      isDisabled={action === 'view'} // Desativa o campo se estiver no modo de visualização
                      flex='1'
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Apelido</FormLabel>
                    <Input
                      value={nick}
                      onChange={handleNickChange}
                      type='string'
                       isDisabled
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Followers</FormLabel>
                    <Input
                      value={followers}
                      onChange={handleFollowersChange}
                      type='number'
                      placeholder='Followers'
                      isDisabled
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Following</FormLabel>
                    <Input
                      value={following}
                      onChange={handleFollowingChange}
                      type='number'
                      placeholder='Following'
                      isDisabled
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Stars</FormLabel>
                    <Input
                      value={stars}
                      onChange={handleStarsChange}
                      type='number'
                      placeholder='Stars'
                      isDisabled
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Contribuições no Último Ano</FormLabel>
                    <Input
                      value={contributionsLastYear}
                      onChange={handleContributionsLastYearChange}
                      type='number'
                      placeholder='Contribuições no Último Ano'
                      isDisabled
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Organização</FormLabel>
                    <Input
                      value={organization}
                      onChange={handleOrganizationChange}
                      placeholder='Organização'
                      isDisabled
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Localização</FormLabel>
                    <Input
                      value={location}
                      onChange={handleLocationChange}
                      placeholder='Localização'
                      isDisabled
                    />
                  </Flex>
                </FormControl>
              </Box>
            </form>
          ) : (
            <Text>Carregando perfil...</Text>
          )}
        </ModalBody>
        <ModalFooter>
          {action === 'edit' && (
            <Button colorScheme="teal" mr={3} type='submit' form='profile-form'>
              Salvar
            </Button>
          )}
          <Button mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalInclude;
