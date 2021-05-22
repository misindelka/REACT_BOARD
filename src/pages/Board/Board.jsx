/* eslint-disable no-console */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Grid, Text } from '@chakra-ui/react'
import { TaskGroups } from '../components/TaskGroups'
import { createTaskGroup, getBoard } from '../../utils/api'

const Board = () => {
  const { id } = useParams()

  // const [status, setStatus] = React.useState('loading') ADD SPINNER
  const [board, setBoard] = React.useState({})

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoard(id)
        setBoard(data)
      }
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }, [id])

  const handleCreateGroup = (newGroup) => {
    createTaskGroup(newGroup.boardId, newGroup.name)
  }

  return (
    <Box h="90vh" bg="gray.100" p="2">
      <Text textAlign="center" fontSize="xx-large" p="3" fontWeight="bold">
        {board.name}
      </Text>

      <Grid gridTemplateColumns={{ base: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}>
        <TaskGroups boardId={id} handleCreateGroup={handleCreateGroup} />
      </Grid>
    </Box>
  )
}

export default Board
