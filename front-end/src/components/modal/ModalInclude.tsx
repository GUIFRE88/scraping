import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Box } from "@chakra-ui/react";
import { useState } from "react";
import { createProfile } from "../../services/profileService";
import { useCustomToast } from "../../hooks/useCustomToast";

interface ModalIncludeProps {
  refreshProfiles: () => void;
}

const ModalInclude: React.FC<ModalIncludeProps> = ({ refreshProfiles }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const showToast = useCustomToast();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status, message } = await createProfile(name, link);
      if (status === 'success') {
        showToast('Perfil adicionado.', message, 'success');
        setName('');
        setLink('');
        setIsOpen(false);
        refreshProfiles();
      } else {
        showToast('Erro ao adicionar perfil.', message, 'error');
      }
    } catch (error) {
     // showToast('Erro ao adicionar perfil.', error.message, 'error');
    }
  };

  return (
    <>
      <Button colorScheme='teal' onClick={() => setIsOpen(true)}>Incluir um novo perfil</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Incluir um novo perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Box padding='10px'>
                  <FormLabel>Nome</FormLabel>
                  <Input required placeholder='Ex. Matz' type='text' value={name} onChange={handleName} />
                </Box>
                <Box padding='10px'>
                  <FormLabel>Endereço web Github</FormLabel>
                  <Input required placeholder='Ex. https://github.com/matz' type='text' value={link} onChange={handleLink} />
                </Box>
              </FormControl>
              <ModalFooter>
                <Button colorScheme='teal' mr={3} type='submit'>
                  Salvar
                </Button>
                <Button variant='ghost' onClick={() => setIsOpen(false)}>Fechar</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalInclude;
