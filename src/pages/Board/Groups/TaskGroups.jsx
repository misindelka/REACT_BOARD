/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import * as React from 'react'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons'
import { createTask, removeTaskGroup, updateTask, updateTaskGroup } from '../../../utils/api'
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

  const handleCreateTask = (newTask) => {
    createTask(board.id, currentGroupId, newTask)
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

  const handleUpdateGroup = (editedGroup) => {
    updateTaskGroup(editedGroup.id, editedGroup)
    const filteredTasks = board.tasks.filter((i) => editedGroup.taskIds.includes(i.id))
    const updatedTasksBoardIds = filteredTasks.reduce((acc, currVal) => {
      return [...acc, { ...currVal, boardId: editedGroup.boardId }]
    }, [])
    updatedTasksBoardIds.map((i) => updateTask(i.id, i))
    fetchBoard()
    console.log(editedGroup.boardId)
  }

  const taskIds = group.taskIds.map((i) => i)

  return (
    <>
      <Box
        key={group.id}
        shadow={group.taskIds < 1 ? 'none' : 'base'}
        minH="17.5vh"
        maxH={['78vh', '83.3vh']}
        minW="350px"
        borderWidth={group.taskIds < 1 ? '0px' : '1px'}
        borderRadius="lg"
        backgroundColor={group.taskIds < 1 ? 'gray.100' : 'red'}
        overflowY={['scroll', 'hidden']}
      >
        <DragHandleIcon />
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
        >
          <EditGroupForm
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
            float="right"
            w="4"
            h="8"
          />
        </Box>
        <Box maxH={['55vh', '68vh']} overflowY="scroll">
          {board.tasks?.map((task) => (
            <Task
              taskIds={taskIds}
              taskGroupId={group.id}
              boardId={board.id}
              key={task.id}
              task={task}
              handleEditTask={handleEditTask}
              fetchBoard={fetchBoard}
            />
          ))}
        </Box>

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
