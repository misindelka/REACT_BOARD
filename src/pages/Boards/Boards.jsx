/* eslint-disable no-console */
import * as React from 'react'
import { Button, Center, Grid, Spinner, useDisclosure } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { getBoards, createBoard, removeBoard, updateBoard } from '../../utils/api'
import { AddBoardForm } from './components/AddBoardForm'
import { BoardCard } from './components/BoardCard'
import { EditBoardForm } from './components/EditBoardFrom'
import { useFetch } from '../../hooks/useFetch'

const Boards = () => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('done')
  const [currentBoard, setCurrentBoard] = React.useState('')
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()

  const { data: boards, fetchData } = useFetch(getBoards)

  const handleCreateBoard = async (newBoard) => {
    if (newBoard === '') {
      console.log()
    } else {
      await createBoard(newBoard.name, newBoard.color)
    }
    fetchData()
  }

  const handleRemoveBoard = async (boardId) => {
    await removeBoard(boardId)
    fetchData()
  }

  const handleEditBoard = async (board) => {
    await setCurrentBoard(board)
    onOpenEdit()
  }

  const handleUpdateBoard = (data) => {
    updateBoard(currentBoard.id, data)
    fetchData()
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
      <Button
        borderColor="blue"
        h="105px"
        m="3"
        leftIcon={<PlusSquareIcon />}
        variant="outline"
        onClick={onOpenCreate}
        cursor="pointer"
      >
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
        isOpenEdit={isOpenEdit}
        onOpenEdit={onOpenEdit}
        onCloseEdit={onCloseEdit}
      />
    </Grid>
  )
}

export default Boards
