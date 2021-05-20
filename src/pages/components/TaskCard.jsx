/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import * as React from 'react'
import { Box } from '@chakra-ui/react'

export const TaskCard = () => {
  return (
    <Box
      m="2"
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      background="white"
      shadow="2"
    >
      <Box p="3">
        <Box d="flex" alignItems="center">
          <Box letterSpacing="wide" fontSize="lg" ml="2">
            Task name
          </Box>
        </Box>
        <Box m="3" letterSpacing="wide" fontSize="xl" ml="2">
          madatory
        </Box>
      </Box>
    </Box>
  )
}
