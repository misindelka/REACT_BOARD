/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react'
import { Box } from '@chakra-ui/react'
// import { id } from 'date-fns/locale'

import { getTasks } from '../../utils/api'

const Tasks = ({ boardId }) => {
  const [status, setStatus] = React.useState('loading')
  const [tasks, setTasks] = React.useState([])

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
  }, [boardId])

  return (
    <>
      {tasks.map((task) => (
        <Box
          key={task.id}
          m="2"
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          background="white"
          shadow="2"
        >
          <Box p="3">
            <Box d="flex" alignItems="center">
              <Box letterSpacing="wide" fontSize="lg" ml="2">
                {task.name}
              </Box>
            </Box>
            <Box m="3" letterSpacing="wide" fontSize="xl" ml="2">
              {task.content}
            </Box>
            <Box m="3" letterSpacing="wide" fontSize="xs" ml="2">
              {task.date}
            </Box>
          </Box>
        </Box>
      ))}
    </>
  )
}

export default Tasks
