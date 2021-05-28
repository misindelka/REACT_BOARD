/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import * as React from 'react'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  createTask,
  getTaskGroups,
  getTasks,
  removeTaskGroup,
  updateTask,
  updateTaskGroup,
} from '../../../utils/api'
import { Task } from './Task'
import { AddNewTask } from '../Components/AddNewTask'
import { AddNewGroup } from '../Components/AddNewGroup'
import { EditTaskForm } from '../Components/EditTaskForm'
import { EditGroupForm } from '../Components/EditGroupForm'
import { AlertDeleteGroup } from './AlertDeleteForm'
import { useFetch } from '../../../hooks/useFetch'

// eslint-disable-next-line react/prop-types
export const TaskGroups = ({ boardId, handleCreateGroup, boardColor }) => {
  // const [status, setStatus] = React.useState('loading')
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
  const hoverColor = boardColor?.replace('400', '500')
  const { data: groups, fetchData: fetchGroups } = useFetch(getTaskGroups, boardId)
  const { data: tasks, fetchData: fetchTasks } = useFetch(getTasks, boardId)

  const handleCreateTasks = (newTask) => {
    createTask(boardId, currentGroupId, newTask)
    onCloseCreateTask()
  }

  const handleEditTask = (task) => {
    setCurrentTask(task)
    onOpenEditTask()
  }

  const handleUpdateTask = (data) => {
    updateTask(currentTask.id, data)
  }

  const handleUpdateGroup = (editedGroup) => {
    updateTaskGroup(editedGroup.id, editedGroup)
    const filteredTasks = tasks.filter((i) => editedGroup.taskIds.includes(i.id))
    const updatedTasksBoardIds = filteredTasks.reduce((acc, currVal) => {
      return [...acc, { ...currVal, boardId: editedGroup.boardId }]
    }, [])
    updatedTasksBoardIds.map((i) => updateTask(i.id, i))
    fetchGroups()
  }

  return (
    <>
      {groups.map((group) => (
        <Box
          key={group.id}
          shadow={group.taskIds < 1 ? 'none' : 'base'}
          minH="17.5vh"
          maxH={['78vh', '83.3vh']}
          minW="350px"
          borderWidth={group.taskIds < 1 ? '0px' : '1px'}
          borderRadius="lg"
          backgroundColor={group.taskIds < 1 ? 'gray.100' : '#F7FAFC'}
          overflowY={['scroll', 'hidden']}
        >
          <Box
            m="2"
            backgroundColor={boardColor}
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
              boardColor={boardColor}
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
            {tasks.map((task) => {
              return group.taskIds.includes(task.id) ? (
                <Task
                  taskGroupId={group.id}
                  boardId={boardId}
                  key={task.id}
                  task={task}
                  handleEditTask={handleEditTask}
                />
              ) : null
            })}
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
              background={boardColor}
              _hover={{
                background: hoverColor,
              }}
            >
              + Add new task
            </Button>
            <AddNewTask
              fetchGroups={fetchGroups}
              fetchTasks={fetchTasks}
              boardColor={boardColor}
              isOpen={isOpenCreateTask}
              onOpen={onOpenCreateTask}
              onClose={onCloseCreateTask}
              handleCreateTask={handleCreateTasks}
              hoverColor={hoverColor}
            />
            <EditTaskForm
              boardColor={boardColor}
              isOpen={isOpenEditTask}
              onOpen={onOpenEditTask}
              onClose={onCloseEditTask}
              currentTask={currentTask}
              handleUpdateTask={handleUpdateTask}
              hoverColor={hoverColor}
            />
            <AlertDeleteGroup
              groupName={group.name}
              groupId={group.id}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              removeTaskGroup={removeTaskGroup}
            />
          </Box>
        </Box>
      ))}
      <AddNewGroup
        fetchGroups={fetchGroups}
        hoverColor={hoverColor}
        boardColor={boardColor}
        boardId={boardId}
        handleCreateGroup={handleCreateGroup}
      />
    </>
  )
}
