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
    
    console.log('Submitted name:', name);
    console.log('Submitted github:', github);

    toast({
      title: 'Finalizado',
      description: "Perquisa finalizada com sucesso",
      status: 'success',
      duration: 9000,
      isClosable: true,
      position:'bottom-right',
    })

    onClose()
  }

    return (
      <>
        <Button onClick={onOpen}>Incluir um novo perfil</Button>
  
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
              <Button colorScheme='blue' mr={3} type='submit'>
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
