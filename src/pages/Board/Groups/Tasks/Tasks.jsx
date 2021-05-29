/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import * as React from 'react'
import { Box, Button, useDisclosure } from '@chakra-ui/react'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { createTask, removeTaskGroup, updateTask, updateTaskGroup } from '../../../../utils/api'
import { Task } from './Task'
import { AddNewTask } from '../../Components/AddNewTask'
import { EditTaskForm } from '../../Components/EditTaskForm'

import { AlertDeleteGroup } from '../AlertDeleteForm'

// eslint-disable-next-line react/prop-types
export const Tasks = ({ group, board, fetchBoard, hoverColor }) => {
  const [currentTask, setCurrentTask] = React.useState('')
  const [currentGroupId, setCurrentGroupId] = React.useState()
  const [isOpen, setIsOpen] = React.useState(false)
  const {
    isOpen: isOpenCreateTask,
    onOpen: onOpenCreateTask,
    onClose: onCloseCreateTask,
  } = useDisclosure()
  const {
    isOpen: isOpenEditTask,
    onOpen: onOpenEditTask,
    onClose: onCloseEditTask,
  } = useDisclosure()

  const tasks = board.tasks?.filter((task) => group.taskIds.includes(task.id))

  const handleCreateTask = async (newTask) => {
    await createTask(board.id, currentGroupId, newTask)
    onCloseCreateTask()
    fetchBoard()
  }

  const handleEditTask = (task) => {
    setCurrentTask(task)
    onOpenEditTask()
  }

  const handleUpdateTask = (data) => {
    updateTask(currentTask.id, data)
    fetchBoard()
  }

  const handleOnDragEnd = async (result) => {
    const items = [...group.taskIds]
    const [reorderedId] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedId)

    await updateTaskGroup(group.id, { ...group, taskIds: items })
    fetchBoard()

    console.log('items', items)
  }
  console.log('group', group)

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={`${group.id}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Box maxH={['55vh', '68vh']} overflowY="scroll">
                {tasks?.map((task, index) => (
                  <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          taskIds={group.taskIds}
                          taskGroupId={group.id}
                          boardId={board.id}
                          task={task}
                          handleEditTask={handleEditTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </Box>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Box m="2">
        <Button
          w="100%"
          textTransform="uppercase"
          onClick={() => {
            onOpenCreateTask()
            setCurrentGroupId(group.id)
          }}
          color="white"
          background={board.color}
          _hover={{
            background: hoverColor,
          }}
        >
          + Add new task
        </Button>
        <AddNewTask
          fetchBoard={fetchBoard}
          boardColor={board.color}
          isOpen={isOpenCreateTask}
          onOpen={onOpenCreateTask}
          onClose={onCloseCreateTask}
          handleCreateTask={handleCreateTask}
          hoverColor={hoverColor}
        />
        <EditTaskForm
          boardColor={board.color}
          isOpen={isOpenEditTask}
          onOpen={onOpenEditTask}
          onClose={onCloseEditTask}
          currentTask={currentTask}
          handleUpdateTask={handleUpdateTask}
          hoverColor={hoverColor}
        />
        <AlertDeleteGroup
          fetchBoard={fetchBoard}
          groupName={group.name}
          groupId={group.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          removeTaskGroup={removeTaskGroup}
        />
      </Box>
    </>
  )
}
