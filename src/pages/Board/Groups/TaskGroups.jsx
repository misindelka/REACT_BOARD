/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import * as React from 'react'
import { Box, Button, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  createTask,
  getTasks,
  removeTaskGroup,
  updateTask,
  updateTaskGroup,
} from '../../../utils/api'
import { Task } from './Task'
import { AddNewTask } from '../Components/AddNewTask'
import { EditTaskForm } from '../Components/EditTaskForm'
import { EditGroupForm } from '../Components/EditGroupForm'
import { AlertDeleteGroup } from './AlertDeleteForm'

// eslint-disable-next-line react/prop-types
export const TaskGroups = ({ group, board, fetchBoard, hoverColor }) => {
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

  const handleCreateTask = async (newTask) => {
    await createTask(board.id, currentGroupId, newTask)
    onCloseCreateTask()
    fetchBoard()
  }

  const handleEditTask = (task) => {
    setCurrentTask(task)
    onOpenEditTask()
  }

  const handleArchiveTask = async (task) => {
    await updateTask(task.id, { ...task, archived: true })
    fetchBoard()
  }

  const handleUpdateTask = (data) => {
    updateTask(currentTask.id, data)
    fetchBoard()
  }

  const handleUpdateGroup = async (editedGroup) => {
    await updateTaskGroup(editedGroup.id, editedGroup)
    const filteredTasks = board.tasks.filter((i) => editedGroup.taskIds.includes(i.id))
    const updatedTasksBoardIds = filteredTasks.reduce((acc, currVal) => {
      return [...acc, { ...currVal, boardId: editedGroup.boardId }]
    }, [])
    updatedTasksBoardIds.map((i) => updateTask(i.id, i))
    fetchBoard()
  }

  const taskIds = group.taskIds.map((i) => i)

  const handleShowArchived = async () => {
    const allTasks = await getTasks(board.id)
    allTasks.map(async (task) => {
      await updateTask(task.id, { ...task, archived: false })
    })
    fetchBoard()
  }
  return (
    <>
      <Box
        outline="none"
        key={group.id}
        shadow={group.taskIds < 1 ? 'none' : 'base'}
        minW="350px"
        minH="17.5vh"
        maxH={['78vh', '85.3vh']}
        borderWidth={group.taskIds < 1 ? '0px' : '1px'}
        borderRadius="lg"
        backgroundColor={useColorModeValue('gray.100', '#1A202C')}
        overflowY={['scroll', 'hidden']}
      >
        <Box
          m="2"
          backgroundColor={board.color}
          textColor="white"
          borderRadius="lg"
          textTransform="uppercase"
          letterSpacing="wide"
          fontWeight="bold"
          textAlign="center"
          p="5"
          fontSize="2xl"
          color="white"
        >
          <EditGroupForm
            handleShowArchived={handleShowArchived}
            hoverColor={hoverColor}
            currentGroup={group}
            handleUpdateGroup={handleUpdateGroup}
            boardColor={board.color}
            currentGroupName={group.name}
          />
          {group.name}
          <DeleteIcon
            cursor="pointer"
            onClick={() => {
              setIsOpen(true)
            }}
            color="white"
            float="right"
            w="4"
            h="8"
          />
        </Box>
        <DragDropContext>
          <Droppable droppableId="dropTasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Box maxH={['55vh', '65vh']} overflowY="scroll">
                  {board.tasks?.map((task, index) => (
                    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            handleArchiveTask={handleArchiveTask}
                            taskIds={taskIds}
                            taskGroupId={group.id}
                            boardId={board.id}
                            key={task.id}
                            task={task}
                            handleEditTask={handleEditTask}
                            fetchBoard={fetchBoard}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
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
      </Box>
    </>
  )
}
