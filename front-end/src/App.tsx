import { Center, Flex, Box, Heading } from '@chakra-ui/react';
import TableList from './components/tableList/TableList';


function App() {
  return (
    <>
      <Flex
        direction="column"
        align="center" 
        justify="center" 
        p={4}
      >
        <Box w="100%">
          <Center>
            <Heading as='h1' size='4xl'>SCRAPING</Heading>
          </Center>
          <Flex direction="column" mb={4}>
            <TableList />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default App;
