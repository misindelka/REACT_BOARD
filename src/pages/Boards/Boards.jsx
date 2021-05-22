import * as React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Center, Grid, Spinner, useDisclosure } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
// import { id } from 'date-fns/locale'
import { getBoards, createBoard } from '../../utils/api'
import { AddBoardForm } from './AddBoardForm'

const Boards = () => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [boards, setBoards] = React.useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

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
    createBoard(newBoard.name, newBoard.color)
    onClose()
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
          to={`/boards/${board.id}?color=${board.color}`}
          m="3"
          key={board.id}
          borderRadius="lg"
          overflow="hidden"
          backgroundColor={board.color || 'blue.400'}
          shadow="2"
          h="250px"
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
      <Button
        m="3"
        h="250px"
        borderStyle="groove"
        leftIcon={<PlusSquareIcon />}
        variant="outline"
        onClick={onOpen}
      >
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
