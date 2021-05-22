/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import * as React from 'react'
import { Text, Box } from '@chakra-ui/react'
// import { id } from 'date-fns/locale'

// eslint-disable-next-line react/prop-types
const Tasks = ({ task }) => {
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
