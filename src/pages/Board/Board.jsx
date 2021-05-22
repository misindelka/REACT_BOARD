/* eslint-disable no-console */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack, Text } from '@chakra-ui/react'
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
    <Box
      overflowX="scroll"
      overflowY={['scroll', 'hidden']}
      minW="100vw" // upravit
      h={['87vh', '93vh']}
      bg="gray.100"
      p="2"
      pb="0"
    >
      <Text
        textAlign="left"
        textDecor="underline"
        fontSize={['1em', 'xx-large']}
        fontWeight="bold"
        pl="7"
        mt="10px"
        mb="10px"
      >
        {board.name}
      </Text>

      <Stack direction="row">
        <TaskGroups boardId={id} handleCreateGroup={handleCreateGroup} />
      </Stack>
    </Box>
  )
}

export default Board
