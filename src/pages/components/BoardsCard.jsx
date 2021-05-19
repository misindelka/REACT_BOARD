/* eslint-disable react/prop-types */
import * as React from 'react'
import { Box } from '@chakra-ui/react'

export const BoardsCard = ({ board }) => {
  return (
    <Box
      m="2"
      maxW="xs"
      minH="40"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="lightcoral"
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
          description {board.id}
        </Box>
        <Box m="3" bottom="1.5" fontSize="xl" ml="2">
          by: misindelka@dev
        </Box>
      </Box>
    </Box>
  )
}
