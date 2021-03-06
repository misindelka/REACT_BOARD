/* eslint-disable no-console */
/* eslint-disable no-shadow */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack, useColorModeValue } from '@chakra-ui/react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { TaskGroups } from './Groups/TaskGroups'
import {
  createTaskGroup,
  getBoard,
  getTaskGroups,
  updateTaskGroup,
  updateTaskGroups,
} from '../../utils/api'
import { useFetch } from '../../hooks/useFetch'
import { AddNewGroup } from './Components/AddNewGroup'
import { FirstGroupForm } from './Components/FirstGroupForm'

const initialGroupValue = {
  name: '',
  boardId: null,
}
const Board = () => {
  const { id } = useParams()
  const { data: board, fetchData: fetchBoard } = useFetch(getBoard, id)
  const { data: taskGroups } = useFetch(getTaskGroups)
  const [newGroup, setNewGroup] = React.useState(initialGroupValue)

  const hoverColor = board.color?.replace('400', '500')
  const handleCreateGroup = (newGroup) => {
    createTaskGroup(parseFloat(id), newGroup.name)
    fetchBoard()
  }
  const handleAddNewGroup = (e) => {
    const { name, value } = e.target
    setNewGroup({ ...newGroup, [name]: value, id })
  }
  const handleSubmitNewGroup = (e) => {
    e.preventDefault()
    handleCreateGroup(newGroup)
    setNewGroup(initialGroupValue)
  }

  const handleEditGroup = async (taskGroupId) => {
    await updateTaskGroup(taskGroupId)
    fetchBoard()
  }

  const handleOnDragEnd = (result) => {
    const items = Array.from(board.taskGroups)
    const [reorderedGroup] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedGroup)

    updateTaskGroups(taskGroups, items)

    console.log('items', items)
    // console.log('board', board.taskGroups)
  }

  return (
    <>
      <Box
        overflowX="scroll"
        overflowY={['scroll', 'hidden']}
        minW="100vw"
        bg={useColorModeValue('gray.100', '#1A202C')}
        p="4"
        pb="0"
        h="90vh"
      >
        {board.taskGroups?.length < 1 ? (
          <FirstGroupForm
            color={board.color}
            handleAddNewGroup={handleAddNewGroup}
            newGroup={newGroup}
            handleSubmitNewGroup={handleSubmitNewGroup}
          />
        ) : (
          <DragDropContext direction="vertical" onDragEnd={handleOnDragEnd}>
            <Droppable direction="horizontal" droppableId="dropGroups">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
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
                    {provided.placeholder}
                    <AddNewGroup
                      newGroup={newGroup}
                      handleSubmitNewGroup={handleSubmitNewGroup}
                      handleAddNewGroup={handleAddNewGroup}
                      handleCreateGroup={handleCreateGroup}
                      handleEditGroup={handleEditGroup}
                      hoverColor={hoverColor}
                      boardColor={board.color}
                      boardId={board.id}
                    />
                  </Stack>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Box>
    </>
  )
}
export default Board
