import * as React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Center, Grid, Spinner, useToast, useDisclosure } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
// import { id } from 'date-fns/locale'
import { getBoards, createBoard } from '../../utils/api'
import { AddBoardForm } from './AddBoardForm'

const Boards = () => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [boards, setBoards] = React.useState([])

  // const [boardColor, setBoardColor] = React.useState('blue.400')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

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
  }, [boards])

  const handleCreateBoard = (newBoard) => {
    if (newBoard === '') {
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
      createBoard(newBoard.name, newBoard.color)
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
          backgroundColor={board.color || 'blue.400'}
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
      <AddBoardForm
        handleCreateBoard={handleCreateBoard}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Grid>
  )
}

export default Boards
