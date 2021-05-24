/* eslint-disable no-console */
import * as React from 'react'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { getTaskGroups, createTask, getTasks, removeTaskGroup, updateTask } from '../../utils/api'
import Tasks from './Tasks'
import { AddNewTask } from '../Board/AddNewTask'
import { AddNewGroup } from '../Board/AddNewGroup'
import { EditTaskForm } from '../Board/EditTaskForm'

// eslint-disable-next-line react/prop-types
export const TaskGroups = ({ boardId, handleCreateGroup, boardColor }) => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [groups, setGroups] = React.useState([])
  const [tasks, setTasks] = React.useState([])
  const [currentTask, setCurrentTask] = React.useState('')
  const [currentGroupId, setCurrentGroupId] = React.useState()
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

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getTaskGroups(boardId)
        setGroups(data)
      }
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }, [boardId])

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getTasks(boardId)
        setTasks(data)
      }
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }, [boardId, tasks])

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

  return (
    <>
      {groups.map((group) => (
        <Box
          key={group.id}
          shadow="xl"
          minH="17.5vh"
          maxH={['78vh', '83.3vh']}
          minW="350px"
          borderWidth="1px"
          borderRadius="lg"
          backgroundColor="#F7FAFC"
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
            <EditIcon float="left" w="4" h="8" />
            {group.name}
            <DeleteIcon
              onClick={() => {
                removeTaskGroup(group.id)
              }}
              float="right"
              w="4"
              h="8"
            />
          </Box>
          <Box maxH={['55vh', '68vh']} overflowY="scroll">
            {tasks.map((task) => {
              return group.taskIds.includes(task.id) ? (
                <Tasks key={task.id} task={task} handleEditTask={handleEditTask} />
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
            >
              + Add new task
            </Button>
            <AddNewTask
              boardColor={boardColor}
              isOpen={isOpenCreateTask}
              onOpen={onOpenCreateTask}
              onClose={onCloseCreateTask}
              handleCreateTask={handleCreateTasks}
            />
            <EditTaskForm
              boardColor={boardColor}
              isOpen={isOpenEditTask}
              onOpen={onOpenEditTask}
              onClose={onCloseEditTask}
              currentTask={currentTask}
              handleUpdateTask={handleUpdateTask}
            />
          </Box>
        </Box>
      ))}
      <AddNewGroup
        boardColor={boardColor}
        boardId={boardId}
        handleCreateGroup={handleCreateGroup}
      />
    </>
  )
}
