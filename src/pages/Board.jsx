/* eslint-disable no-console */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Grid,
  Button,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  Modal,
  useDisclosure,
  Textarea,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { createTask, getBoard, getTaskGroups, getTasks, createTaskGroup } from '../utils/api'

const Board = () => {
  const { id } = useParams()

  // const [status, setStatus] = React.useState('loading')
  const [board, setBoard] = React.useState({})
  const [groups, setGroups] = React.useState([])
  const [tasks, setTasks] = React.useState([])
  const [newTaskContent, setNewTaskContent] = React.useState('')
  const [newTaskName, setNewTaskName] = React.useState('')
  const [newGroupName, setNewGroupName] = React.useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialFocusRef = React.useRef()

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getTasks(id)
        setTasks(data)
      }
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }, [id, newTaskContent, newGroupName])

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
  }, [id, newTaskContent, newGroupName])

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
  }, [id, newTaskContent, newGroupName])

  function handleNewTaskContent(e, boardId, taskGroupId) {
    e.preventDefault()
    onClose()
    createTask(boardId, taskGroupId, {
      name: newTaskName,
      content: newTaskContent,
      assignedTo: (rest) => [...rest, taskGroupId],
    })
    setNewTaskContent('')
    setNewTaskName('')
  }

  function handleAddNewGroup(e) {
    e.preventDefault()
    createTaskGroup(id, newGroupName)
    setNewGroupName('')
  }

  return (
    <Box h="90vh" bg="gray.100" p="2">
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
            <Box>
              {tasks.map((task) => (
                <>
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
                    <Box textAlign="center">
                      <Text fontWeight="bold" textTransform="uppercase" pt="3" fontSize="xl">
                        {task.name}
                      </Text>
                      <Text p="3">{task.content}</Text>
                      <Text pb="2" color="gray" fontSize="11px">
                        {task.date}
                      </Text>
                    </Box>
                  </Box>
                </>
              ))}
            </Box>
            <Box m="2">
              <Button
                textTransform="uppercase"
                letterSpacing="wide"
                fontWeight="bold"
                color="white"
                leftIcon={<PlusSquareIcon />}
                w="100%"
                background="blue.400"
                variant="outline"
                onClick={onOpen}
              >
                Add new task
              </Button>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add new task</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl mt={4}>
                      <Input
                        size="sm"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        variant="flushed"
                        placeholder="Task name"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <Textarea
                        value={newTaskContent}
                        onChange={(e) => setNewTaskContent(e.target.value)}
                        placeholder="Task content"
                        size="sm"
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      onClick={(e) => {
                        return handleNewTaskContent(e, id, group.id)
                      }}
                      colorScheme="blue"
                      mr={3}
                    >
                      Add task
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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
          <Popover initialFocusRef={initialFocusRef}>
            <PopoverTrigger>
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
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader color="blackAlpha.700">Please input group name</PopoverHeader>
              <PopoverBody>
                <Input
                  color="black"
                  ref={initialFocusRef}
                  variant="flushed"
                  placeholder="Group name here"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
                <Button onClick={(e) => handleAddNewGroup(e)} w="80%" background="blue.400" mt="3">
                  Add
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Grid>
    </Box>
  )
}

export default Board
