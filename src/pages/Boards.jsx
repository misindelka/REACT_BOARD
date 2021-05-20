import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Center,
  FormControl,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
// import { id } from 'date-fns/locale'
import { getBoards, createBoard } from '../utils/api'

const Boards = () => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [boards, setBoards] = React.useState([])
  const [newBoardName, setNewBoardName] = React.useState('')
  const [boardColor, setBoardColor] = React.useState('blue.400')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoards()
        setStatus('done')
        setBoards(data)
      }
      fetchData()
    } catch (e) {
      //  do nothing
    }
  }, [newBoardName, boardColor])

  function handleAddBoard(event) {
    event.preventDefault()
    setNewBoardName(event.target.value)
  }

  function handleAddNewBoard() {
    if (newBoardName === '') {
      toast({
        title: 'You need to input the board name.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      // } else if (!boards.map((board) => board.name.includes(newBoardName))) {
      //   toast({
      //     title: 'Board with this name already exists',
      //     description: 'Please enter new board name',
      //     status: 'error',
      //     duration: 3000,
      //     isClosable: true,
      //   })
    } else {
      createBoard(newBoardName, boardColor)
      setNewBoardName('')
      onClose()
    }
  }
  return status !== 'done' ? (
    <Center>
      <Spinner
        m="33vh"
        thickness="4px"
        speed="1s"
        emptyColor="blue.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  ) : (
    <Grid mt="3" gridTemplateColumns={{ base: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}>
      {boards.map((board) => (
        <Box
          display="flex"
          p="4"
          justifyContent="center"
          alignItems="center"
          minH="10vh"
          as={Link}
          m="3"
          to={`/boards/${board.id}`}
          key={board.id}
          borderRadius="lg"
          overflow="hidden"
          backgroundColor={board.color}
          shadow="2"
          color="white"
        >
          <Box
            textAlign="center"
            fontWeight="bold"
            letterSpacing="wide"
            fontSize="md"
            textTransform="uppercase"
          >
            {board.name}
          </Box>
        </Box>
      ))}
      <Button m="3" leftIcon={<PlusSquareIcon />} variant="outline" onClick={onOpen}>
        Add new board
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new board</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <Input
                required
                variant="flushed"
                value={newBoardName}
                onChange={(e) => handleAddBoard(e)}
                placeholder="Board Name"
              />
            </FormControl>
            <FormControl mt={4}>
              <Select
                defaultValue="blue.400"
                onChange={(e) => setBoardColor(e.target.value)}
                variant="flushed"
                placeholder="Board color"
              >
                <option value="blue.400">Blue</option>
                <option value="red.400">Red</option>
                <option value="green.400">Green</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleAddNewBoard} colorScheme="blue" mr={3}>
              Create board
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  )
}

export default Boards
