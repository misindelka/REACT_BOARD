/* eslint-disable no-shadow */
/* eslint-disable no-console */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack, Text } from '@chakra-ui/react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { TaskGroups } from './Groups/TaskGroups'
import { createTaskGroup, getBoard, updateTaskGroup } from '../../utils/api'
import { useFetch } from '../../hooks/useFetch'
import { AddNewGroup } from './Components/AddNewGroup'

const Board = () => {
  const { id } = useParams()

  const { data: board, fetchData: fetchBoard } = useFetch(getBoard, id)
  const hoverColor = board.color?.replace('400', '500')

  const handleCreateGroup = (newGroup) => {
    createTaskGroup(newGroup.boardId, newGroup.name)
    fetchBoard()
  }

  const handleEditGroup = (taskGroupId) => {
    updateTaskGroup(taskGroupId)
    fetchBoard()
  }

  console.log()
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

      <DragDropContext>
        <Droppable droppableId="dropGroups">
          {(provided) => (
            <Stack ref={provided.innerRef} {...provided.droppableProps} direction="row">
              {board.taskGroups?.map((group, index) => (
                <Draggable key={group.id} draggableId={group.id} index={index}>
                  {(provided) => (
                    <TaskGroups
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      hoverColor={hoverColor}
                      group={group}
                      board={board}
                      fetchBoard={fetchBoard}
                      handleCreateGroup={handleCreateGroup}
                      handleEditGroup={handleEditGroup}
                    />
                  )}
                </Draggable>
              ))}
              <AddNewGroup
                handleCreateGroup={handleCreateGroup}
                handleEditGroup={handleEditGroup}
                hoverColor={hoverColor}
                boardColor={board.color}
                boardId={board.id}
              />
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default Board
