import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Grid, Button, Text } from '@chakra-ui/react'
import { getBoard } from '../utils/api'
<<<<<<< HEAD
import TaskGrpups from './components/TaskGroups'
=======
import { TaskGroupColumn } from './components/TaskGrupColumn'
>>>>>>> parent of ce850b2... GetTaskGroups

const Board = () => {
  const { id } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [board, setBoard] = React.useState({})

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoard(id)

        setBoard(data)
      }
      fetchData()
    } catch (e) {
      // do nothing
    }
  }, [id])

  return (
    <Box h="100vh" bg="gray.100" p="2">
      <Text p="3" fontWeight="bold">
        {board.name}
      </Text>
<<<<<<< HEAD
      <Grid mt="3" templateColumns={{ base: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}>
        <TaskGrpups boardId={board.id} />
        <TaskGrpups boardId={board.id} />

=======
      <Grid gridTemplateColumns={['auto', '15rem auto']} gap="4">
        <TaskGroupColumn />
>>>>>>> parent of ce850b2... GetTaskGroups
        <Box m="4">
          <Button colorScheme="blue">+ Add new group </Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default Board
