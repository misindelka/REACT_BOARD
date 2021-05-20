/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import * as React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { TaskCard } from './TaskCard'

export const TaskGroupColumn = ({ group }) => {
  return (
    <Box
      m="2"
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="#F7FAFC"
    >
      <Box
        m="2"
        backgroundColor="blue.500"
        textColor="white"
        borderRadius="lg"
        textTransform="uppercase"
        letterSpacing="wide"
        fontWeight="bold"
        textAlign="center"
      >
        {group.name}
      </Box>
      <TaskCard />
      <Box m="2">
        <Button colorScheme="blue">+ Add new task</Button>
      </Box>
    </Box>
  )
}
