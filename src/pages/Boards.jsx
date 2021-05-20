import * as React from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid } from '@chakra-ui/react'
// import { id } from 'date-fns/locale'

import { getBoards } from '../utils/api'

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

  return (
    <Grid gridTemplateColumns={['auto', '15rem auto']} gap="4">
      {boards.map((board) => (
        <Box
          as={Link}
          to={`/boards/${board.id}`}
          key={board.id}
          m="2"
          maxW="xs"
          minH="40"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          backgroundColor="gray.200"
          shadow="2"
        >
          <Box p="3">
            <Box d="flex" alignItems="center">
              <Box
                fontWeight="bold"
                letterSpacing="wide"
                fontSize="md"
                textTransform="uppercase"
                ml="2"
              >
                {board.name}
              </Box>
            </Box>
            <Box m="3" letterSpacing="wide" fontSize="xl" ml="2">
              number: {board.id}
            </Box>
            <Box m="3" bottom="1.5" fontSize="xl" ml="2">
              by: misindelka@dev
            </Box>
          </Box>
        </Box>
      ))}
    </Grid>
  )
}

export default Boards
