/* eslint-disable no-console */
import * as React from 'react'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
// import { id } from 'date-fns/locale'

import { getTaskGroups, createTask, updateTaskGroups } from '../../utils/api'
import Tasks from './Tasks'
import { AddNewTask } from '../Board/AddNewTask'

// eslint-disable-next-line react/prop-types
export const TaskGroups = ({ boardId }) => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [groups, setGroups] = React.useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = React.useRef()

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

  // const updateTaskGroupsById = groups.map((i) => i)
  // console.log(updateTaskGroupsById)

  const handleCreateTasks = (newTask) => {
    createTask(boardId, ref.current.id, newTask)
    updateTaskGroups(newTask.id)
    onClose()
  }

  return (
    <>
      {groups.map((group) => (
        <Box
          ref={ref}
          key={group.id}
          m="2"
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
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
            <Tasks boardId={boardId} />
          </Box>

          <Box m="2">
            <Button onClick={onOpen} colorScheme="blue">
              + Add new task
            </Button>
          </Box>
        </Box>
      ))}
      <AddNewTask
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleCreateTask={handleCreateTasks}
      />
    </>
  )
}