/* eslint-disable react/prop-types */
import * as React from 'react'
import { Box, Fade } from '@chakra-ui/react'

import { AlertDeleteBoard } from '../../Board/Groups/AlertDeleteForm'
import { useFetch } from '../../../hooks/useFetch'
import { getTaskGroups, getTasks } from '../../../utils/api'
import { BoardMenu } from '../../Board/Components/BoardMenu'
import { BoardInfo } from './BoardInfo'

export const BoardCard = ({ board, handleRemoveBoard, handleEditBoard, boardId }) => {
  const { data: taskGroups } = useFetch(getTaskGroups, boardId)
  const { data: tasks } = useFetch(getTasks, boardId)
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Fade in={board}>
      <Box
        borderRadius="lg"
        overflow="hidden"
        backgroundColor={board.color || 'blue.400'}
        shadow="2"
        color="white"
        m="3"
        pl="5"
        pr="5"
        p="10"
      >
        <BoardMenu board={board} setIsOpen={setIsOpen} handleEditBoard={handleEditBoard} />
        <Box>
          <BoardInfo board={board} taskGroups={taskGroups} tasks={tasks} />
        </Box>
        <AlertDeleteBoard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          boardId={board.id}
          boardName={board.name}
          handleRemoveBoard={handleRemoveBoard}
        />
        <Box />
      </Box>
    </Fade>
  )
}
