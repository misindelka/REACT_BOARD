import * as React from 'react'
import { Box, Center, Grid } from '@chakra-ui/react'
import { id } from 'date-fns/locale'
import { getBoards } from '../utils/api'
import { BoardsCard } from './components/BoardsCard'

const Boards = () => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [boards, setBoards] = React.useState([])

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoards()
        setBoards(data)
      }
      fetchData()
    } catch (e) {
      //  do nothing
    }
  }, [])

  console.log(boards)

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <Box>
        {boards.map((board) => (
          <BoardsCard key={id} board={board} />
        ))}
      </Box>
      <Box>
        {boards.map((board) => (
          <BoardsCard key={id} board={board} />
        ))}
      </Box>
      <Box>
        {boards.map((board) => (
          <BoardsCard key={id} board={board} />
        ))}
      </Box>
      <Box>
        {boards.map((board) => (
          <BoardsCard key={id} board={board} />
        ))}
      </Box>
      <Box>
        {boards.map((board) => (
          <BoardsCard key={id} board={board} />
        ))}
      </Box>
      <Box>
        {boards.map((board) => (
          <BoardsCard key={id} board={board} />
        ))}
      </Box>
      <Box>
        {boards.map((board) => (
          <BoardsCard key={id} board={board} />
        ))}
      </Box>
    </Grid>
  )
}

export default Boards
