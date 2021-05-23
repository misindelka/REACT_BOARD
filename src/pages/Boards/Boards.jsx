import * as React from 'react'
import { Button, Center, Grid, Spinner, useToast, useDisclosure } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { getBoards, createBoard, removeBoard } from '../../utils/api'
import { AddBoardForm } from './AddBoardForm'
import { BoardCard } from '../components/BordCard'

const Boards = () => {
  const [status, setStatus] = React.useState('loading')
  const [boards, setBoards] = React.useState([])
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
      console.log(e)
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
    } else {
      createBoard(newBoard.name, newBoard.color)
      onClose()
    }
  }

  const handleRemoveBoard = (boardId) => {
    removeBoard(boardId)
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
        <BoardCard key={board.id} board={board} handleRemoveBoard={handleRemoveBoard} />
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
