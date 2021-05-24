/* eslint-disable no-console */
import * as React from 'react'
import { Button, Center, Grid, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { getBoards, createBoard, removeBoard, updateBoard } from '../../utils/api'
import { AddBoardForm } from './AddBoardForm'
import { BoardCard } from './BoardCard'
import { EditBoardForm } from './EditBoardFrom'

const Boards = () => {
  const [status, setStatus] = React.useState('loadings')
  const [boards, setBoards] = React.useState([])
  const [currentBoard, setCurrentBoard] = React.useState('')
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  // eslint-disable-next-line no-unused-vars
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
  }, [boards, status])

  const handleCreateBoard = (newBoard) => {
    if (newBoard === '') {
      console.log()
    } else {
      createBoard(newBoard.name, newBoard.color)
    }
  }

  const handleRemoveBoard = (boardId) => {
    removeBoard(boardId)
  }

  const handleEditBoard = (board) => {
    setCurrentBoard(board)
    onOpenEdit()
  }

  const handleUpdateBoard = (data) => {
    updateBoard(currentBoard.id, data)
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
        <BoardCard
          key={board.id}
          board={board}
          handleRemoveBoard={handleRemoveBoard}
          handleEditBoard={handleEditBoard}
        />
      ))}
      <Button m="3" leftIcon={<PlusSquareIcon />} variant="outline" onClick={onOpenCreate}>
        Add new board
      </Button>
      <AddBoardForm
        handleCreateBoard={handleCreateBoard}
        isOpen={isOpenCreate}
        onOpen={onOpenCreate}
        onClose={onCloseCreate}
      />
      <EditBoardForm
        currentBoard={currentBoard}
        handleUpdateBoard={handleUpdateBoard}
        isOpen={isOpenEdit}
        onOpen={onOpenEdit}
        onClose={onCloseEdit}
      />
    </Grid>
  )
}

export default Boards
