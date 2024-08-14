// src/components/ModalView.tsx
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Box, Center, Avatar, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ProfileInterface } from "../../types/profile.interface";
import { useProfile } from "../../hooks/useProfile";
import { useCustomToast } from "../../hooks/useCustomToast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId?: number;
  action: string // Define a ação: 'view' ou 'edit'
  refreshProfiles: () => void;
}

const ModalView: React.FC<ModalProps> = ({ isOpen, onClose, profileId, action, refreshProfiles }) => {
  const { profile, loading, handleUpdateProfile } = useProfile(profileId);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [nick, setNick] = useState('');
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [contributionsLastYear, setContributionsLastYear] = useState<number>(0);
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const showToast = useCustomToast();

  // Update state when profile data changes
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setLink(profile.link);
      setNick(profile.nick_name);
      setFollowers(profile.followers);
      setFollowing(profile.following);
      setStars(profile.stars);
      setContributionsLastYear(profile.contributions_last_year);
      setOrganization(profile.organization);
      setLocation(profile.location);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleUpdateProfile({ name, link });
      showToast('Perfil atualizado.', 'Perfil atualizado com sucesso.', 'success');
      onClose();
      refreshProfiles();
    } catch (error) {
      showToast('Erro ao atualizar perfil.', 'Ocorreu um erro ao atualizar o perfil.', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{action === 'edit' ? 'Editar Perfil' : 'Detalhes do Perfil'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Text>Carregando perfil...</Text>
          ) : (
            <form onSubmit={handleSubmit}>
              <Box>
                <Center>
                  <Avatar size='2xl' name={profile?.name} src={profile?.profile_image} mb={4} />
                </Center>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Nome:</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Nome'
                      isDisabled={action === 'view'}
                      flex='1'
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Link:</FormLabel>
                    <Input
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder='Link'
                      isDisabled={action === 'view'}
                      flex='1'
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Apelido</FormLabel>
                    <Input
                      value={nick}
                      onChange={(e) => setNick(e.target.value)}
                      type='text'
                      isDisabled
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <Flex alignItems='center'>
                    <FormLabel mb={0} mr={4} flexShrink={0}>Followers</FormLabel>
                    <Input
                      value={followers}
                      onChange={(e) => setFollowers(Number(e.target.value))}
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
                      onChange={(e) => setFollowing(Number(e.target.value))}
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
                      onChange={(e) => setStars(Number(e.target.value))}
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
                      onChange={(e) => setContributionsLastYear(Number(e.target.value))}
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
                      onChange={(e) => setOrganization(e.target.value)}
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
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder='Localização'
                      isDisabled
                    />
                  </Flex>
                </FormControl>
                <Flex justifyContent='flex-end' mt={4}>
                  {action === 'edit' && (
                    <Button colorScheme="teal" mr={3} type='submit'>
                      Salvar
                    </Button>
                  )}
                  <Button mr={3} onClick={onClose}>
                    Fechar
                  </Button>
                </Flex>
              </Box>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalView;
