/* eslint-disable no-console */
import * as React from 'react'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
// import { id } from 'date-fns/locale'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { getTaskGroups, createTask, getTasks, removeTaskGroup } from '../../utils/api'
import Tasks from './Tasks'
import { AddNewTask } from '../Board/AddNewTask'
import { AddNewGroup } from '../Board/AddNewGroup'

// eslint-disable-next-line react/prop-types
export const TaskGroups = ({ boardId, handleCreateGroup }) => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [groups, setGroups] = React.useState([])
  const [tasks, setTasks] = React.useState([])
  const [currentGroupId, setCurrentGroupId] = React.useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
  }, [boardId, groups])

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
    onClose()
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
            backgroundColor="blue.500"
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
                <Tasks boardId={boardId} task={task} />
              ) : null
            })}
          </Box>

          <Box m="2">
            <Button
              w="100%"
              textTransform="uppercase"
              onClick={() => {
                onOpen()
                setCurrentGroupId(group.id)
              }}
              colorScheme="blue"
            >
              + Add new task
            </Button>
            <AddNewTask
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              handleCreateTask={handleCreateTasks}
            />
          </Box>
        </Box>
      ))}
      <AddNewGroup boardId={boardId} handleCreateGroup={handleCreateGroup} />
    </>
  )
}
