/* eslint-disable no-shadow */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack, Text } from '@chakra-ui/react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { TaskGroups } from './Groups/TaskGroups'
import { createTaskGroup, getBoard, updateTaskGroup, updateTaskGroups } from '../../utils/api'
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

  const handleOnDragEnd = (result) => {
    const items = Array.from(board.taskGroups)
    const [reorderedId] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedId)

    // updateTaskGroups(...board, { taskGroups: items })

    // console.log('items', items)
  }
  // console.log('board', board.taskGroups)

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

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={`${board.id}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Stack direction="row">
                {board.taskGroups?.map((group, index) => (
                  <Draggable key={group.id} draggableId={`${group.id}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskGroups
                          key={group.id}
                          hoverColor={hoverColor}
                          group={group}
                          board={board}
                          fetchBoard={fetchBoard}
                          handleCreateGroup={handleCreateGroup}
                          handleEditGroup={handleEditGroup}
                        />
                      </div>
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default Board
