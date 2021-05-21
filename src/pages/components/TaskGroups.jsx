import * as React from 'react'
import { Grid, Box, Button } from '@chakra-ui/react'
// import { id } from 'date-fns/locale'

import { getTaskGroups } from '../../utils/api'

import Tasks from './Tasks'

// eslint-disable-next-line react/prop-types
const TaskGrpups = ({ boardId }) => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [groups, setGroups] = React.useState([])

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

  return (
    <Grid gridTemplateColumns={['auto', '15rem auto']} gap="4">
      {groups.map((group) => (
        <Box
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
            <Tasks boardId={boardId} />
            <Tasks boardId={boardId} />
            <Tasks boardId={boardId} />
            <Tasks boardId={boardId} />
            <Tasks boardId={boardId} />
          </Box>

          <Box m="2">
            <Button colorScheme="blue">+ Add new task</Button>
          </Box>
        </Box>
      ))}
    </Grid>
  )
}

export default TaskGrpups
