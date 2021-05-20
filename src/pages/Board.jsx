/* eslint-disable no-console */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Grid, Button, Text } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { getBoard, getTaskGroups } from '../utils/api'
import Task from './components/Tasks'

const Board = () => {
  const { id } = useParams()

  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [board, setBoard] = React.useState({})
  const [groups, setGroups] = React.useState([])

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getTaskGroups(id)
        setGroups(data)
      }
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }, [id])

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
      <Text textAlign="center" fontSize="xx-large" p="3" fontWeight="bold">
        {board.name}
      </Text>
      <Grid gridTemplateColumns={{ base: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}>
        {groups.map((group) => (
          <Box
            key={group.id}
            m="2"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            backgroundColor="#F7FAFC"
            s
          >
            <Box
              m="2"
              backgroundColor="blue.400"
              textColor="white"
              borderRadius="lg"
              textTransform="uppercase"
              letterSpacing="wide"
              fontWeight="bold"
              textAlign="center"
              p="4"
            >
              {group.name}
            </Box>
            <Task boardId={id} />
            <Box m="2">
              <Button w="100%" color="white" leftIcon={<PlusSquareIcon />} background="blue.400">
                Add new task
              </Button>
            </Box>
          </Box>
        ))}
        <Box
          textColor="white"
          borderRadius="lg"
          textTransform="uppercase"
          letterSpacing="wide"
          fontWeight="bold"
          textAlign="center"
          p="4"
        >
          <Button
            textTransform="uppercase"
            letterSpacing="wide"
            fontWeight="bold"
            color="white"
            leftIcon={<PlusSquareIcon />}
            p="7"
            w="100%"
            background="blue.400"
          >
            Add new group
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default Board
