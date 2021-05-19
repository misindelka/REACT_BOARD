import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Center } from '@chakra-ui/react'
import { getBoard } from '../utils/api'

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

  console.log('board', board)
  return (
    <Box h="100vh">
      <Center h="100%">Board {id} detail</Center>
    </Box>
  )
}

export default Board
