/* eslint-disable no-console */
import * as React from 'react'
import { Button, Center, Grid, Spinner, useDisclosure } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { getBoards, createBoard, removeBoard, updateBoard } from '../../utils/api'
import { AddBoardForm } from './components/AddBoardForm'
import { BoardCard } from './components/BoardCard'
import { EditBoardForm } from './components/EditBoardFrom'
import { useFetch } from '../../hooks/useFetch'
import { FirstBoardForm } from '../Board/Components/FirstBoardForm'

const initialNewBoardValue = {
  name: '',
  color: 'blue.400',
}
const Boards = () => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('done')
  const [boardColor, setBoardColor] = React.useState()
  const [currentBoard, setCurrentBoard] = React.useState('')
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  const { data: boards, fetchData } = useFetch(getBoards)

  const [newBoard, setNewBoard] = React.useState(initialNewBoardValue)
  const handleCreateBoard = async () => {
    if (newBoard === '') {
      console.log()
    } else {
      await createBoard(newBoard.name, boardColor)
    }
    fetchData()
  }
  const handleAddNewBoard = (e) => {
    const { name, value } = e.target
    setNewBoard({ ...newBoard, [`${name}`]: value, members: [] })
  }
  const handleSubmitForm = (e) => {
    e.preventDefault()
    console.log({ ...newBoard, color: boardColor })
    handleCreateBoard({ ...newBoard, color: boardColor })
    setNewBoard(initialNewBoardValue)
    onCloseCreate()
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
    <>
      <Grid mt="3" gridTemplateColumns={{ base: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}>
        {boards.length < 1 ? (
          <FirstBoardForm
            boardColor={boardColor}
            newBoard={newBoard}
            handleAddNewBoard={handleAddNewBoard}
            setBoardColor={setBoardColor}
            handleSubmitForm={handleSubmitForm}
          />
        ) : (
          <>
            {boards.map((board) => (
              <BoardCard
                boardColor={boardColor}
                setBoardColor={setBoardColor}
                boardId={board.id}
                key={board.id}
                board={board}
                handleRemoveBoard={handleRemoveBoard}
                handleEditBoard={handleEditBoard}
              />
            ))}
            <Button
              borderColor="blue"
              h="105px"
              mt="15%"
              mr="3"
              ml="3"
              leftIcon={<PlusSquareIcon />}
              onClick={onOpenCreate}
              cursor="pointer"
            >
              Add new board
            </Button>
          </>
        )}

        <AddBoardForm
          boardColor={boardColor}
          newBoard={newBoard}
          setBoardColor={setBoardColor}
          handleAddNewBoard={handleAddNewBoard}
          handleCreateBoard={handleCreateBoard}
          isOpen={isOpenCreate}
          onOpen={onOpenCreate}
          onClose={onCloseCreate}
          handleSubmitForm={handleSubmitForm}
        />
        <EditBoardForm
          setBoardColor={setBoardColor}
          boardColor={boardColor}
          currentBoard={currentBoard}
          handleUpdateBoard={handleUpdateBoard}
          isOpenEdit={isOpenEdit}
          onOpenEdit={onOpenEdit}
          onCloseEdit={onCloseEdit}
        />
      </Grid>
    </>
  )
}

export default Boards
