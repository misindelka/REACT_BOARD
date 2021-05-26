/* eslint-disable no-console */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack, Text } from '@chakra-ui/react'
import { TaskGroups } from './Groups/TaskGroups'
import { createTaskGroup, getBoard, updateTaskGroup } from '../../utils/api'
import { useFetch } from '../../hooks/useFetch'

const Board = () => {
  const { id } = useParams()

  const { data: board } = useFetch(getBoard, id)

  const handleCreateGroup = (newGroup) => {
    createTaskGroup(newGroup.boardId, newGroup.name)
  }

  const handleEditTaskGroup = (taskGroupId) => {
    updateTaskGroup(taskGroupId)
  }

  return (
    <Box
      overflowX="scroll"
      overflowY={['scroll', 'hidden']}
      minW="100vw"
      h={['87vh', '93vh']}
      bg="gray.100"
      p="2"
      pb="0"
    >
      <Text
        textAlign="left"
        textDecor="underline"
        fontSize={['1em', 'xx-large']}
        fontWeight="bold"
        pl="7"
        mt="10px"
        mb="10px"
      >
        {board.name}
      </Text>

      <Stack direction="row">
        <TaskGroups
          handleEditTaskGroup={handleEditTaskGroup}
          boardColor={board.color}
          boardId={id}
          handleCreateGroup={handleCreateGroup}
        />
      </Stack>
    </Box>
  )
}

export default Board
