/* eslint-disable no-console */
import * as React from 'react'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
// import { id } from 'date-fns/locale'

import { getTaskGroups, createTask, getTasks } from '../../utils/api'
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
          m="2"
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          overflowY="scroll"
          maxH="75vh"
          backgroundColor="#F7FAFC"
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
          >
            {group.name}
          </Box>
          <Box overflowY="scroll" h="300px">
            {tasks.map((task) => {
              return group.taskIds.includes(task.id) ? <Tasks key={task.id} task={task} /> : null
            })}
          </Box>

          <Box m="2">
            <Button
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
