import { Button, 
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
         useToast, 
         useDisclosure, 
         Box} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";


function ModalInclude() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [github, setGithub] = useState('')
  const toast = useToast()

  const handleName = (e: React.FocusEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleGithub = (e: React.FocusEvent<HTMLInputElement>) => {
    setGithub(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Make the POST request to the backend
    axios.post('http://0.0.0.0:3000/profiles', {
      name,
      github
    })
    .then(response => {
      // Assuming your backend sends a JSON response with status and message
      const { status, message } = response.data;
      if (status === 'success') {
        toast({
          title: 'Perfil adicionado.',
          description: message,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        });
        setName('');
        setGithub('');
        onClose(); // Close the modal after successful submission
      } else {
        toast({
          title: 'Erro ao adicionar perfil.',
          description: message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
    })
    .catch(error => {
      console.error('Erro ao adicionar o perfil:', error);
      toast({
        title: 'Erro ao adicionar perfil.',
        description: 'Ocorreu um erro ao adicionar o perfil.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    });
  };
  

    return (
      <>
        <Button colorScheme='teal' onClick={onOpen}>Incluir um novo perfil</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Incluir um novo perfil</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Box padding='10px'>
                  <FormLabel>Nome</FormLabel>
                  <Input required placeholder='Ex. Matz' type='name' value={name} onChange={handleName}/>
                </Box>
                <Box padding='10px'>
                  <FormLabel>Endereço web Github</FormLabel>
                  <Input required placeholder='Ex. https://github.com/matz' type='github' value={github} onChange={handleGithub} />
                </Box>
              </FormControl>
            
            <ModalFooter>
              <Button colorScheme='teal' mr={3} type='submit'>
                Salvar
              </Button>
              <Button variant='ghost' onClick={onClose}>Fechar</Button>
            </ModalFooter>
            </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
   
      )
  }
  
  
export default ModalInclude;
