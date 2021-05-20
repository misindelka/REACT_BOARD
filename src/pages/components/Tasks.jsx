import * as React from 'react'
import { Grid, Box } from '@chakra-ui/react'
// import { id } from 'date-fns/locale'

import { getTasks } from '../../utils/api'

// eslint-disable-next-line react/prop-types
const Tasks = ({ boardId }) => {
  // eslint-disable-next-line no-unused-vars
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
    <Grid gap="4">
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
            <Box m="3" letterSpacing="wide" fontSize="xl" ml="2">
              {task.date}
            </Box>
          </Box>
        </Box>
      ))}
    </Grid>
  )
}

export default Tasks
