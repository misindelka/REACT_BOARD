import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Grid, Button, Text } from '@chakra-ui/react'
import { getBoard } from '../utils/api'
import { TaskGroupColumn } from './components/TaskGrupColumn'

const Board = () => {
  const { id } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [board, setBoard] = React.useState({})

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoard(id)
        console.log('getBoard', getBoard)
        setBoard(data)
      }
      fetchData()
    } catch (e) {
      // do nothing
    }
  }, [id])

  console.log('board', board)
  return (
    <Box h="100vh" bg="gray.100" p="2">
      <Text p="3" fontWeight="bold">
        BOARD NAME
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <TaskGroupColumn />
        <Box m="4">
          <Button colorScheme="blue">+ Add new group </Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default Board
