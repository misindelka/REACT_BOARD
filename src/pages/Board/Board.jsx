/* eslint-disable no-console */
/* eslint-disable no-shadow */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack, useColorModeValue } from '@chakra-ui/react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { TaskGroups } from './Groups/TaskGroups'
import { createTaskGroup, getBoard, updateTaskGroup } from '../../utils/api'
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
  const handleOnDragEnd = (result) => {
    console.log(result.source.index)
    console.log(result.destination.index)
  }

  const handleEditGroup = async (taskGroupId) => {
    await updateTaskGroup(taskGroupId)
    fetchBoard()
  }

  return (
    <>
      <Box
        ov
        overflowX="scroll"
        overflowY={['scroll', 'hidden']}
        minW="100vw"
        bg={useColorModeValue('gray.100', '#1A202C')}
        p="2"
        pb="0"
        maxH="93vh"
      >
        {/* <Text pl="6" fontSize="30px" color={board.color}>
          {board.name}
        </Text> */}
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
