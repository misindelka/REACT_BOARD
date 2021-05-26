/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import * as React from 'react'
import { Text, Box } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { removeTask } from '../../../utils/api'
// import { id } from 'date-fns/locale'

// eslint-disable-next-line react/prop-types
const Tasks = ({ task, boardId, handleEditTask }) => {
  return (
    <Box>
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
          <EditIcon
            onClick={() => {
              handleEditTask(task)
            }}
            float="left"
            boxSize="1.3em"
            m="2"
          />
          <DeleteIcon
            onClick={() => {
              removeTask(boardId, task.id)
            }}
            float="right"
            boxSize="1.3em"
            m="2"
          />
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
    </Box>
  )
}

export default Tasks
