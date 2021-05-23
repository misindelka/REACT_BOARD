/* eslint-disable react/prop-types */
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

export const BoardCard = ({ board }) => {
  return (
    <Box
      display="flex"
      p="4"
      justifyContent="center"
      alignItems="center"
      minH="10vh"
      as={Link}
      m="3"
      to={`/boards/${board.id}`}
      key={board.id}
      borderRadius="lg"
      overflow="hidden"
      backgroundColor={board.color || 'blue.400'}
      shadow="2"
      color="white"
    >
      <Box
        textAlign="center"
        fontWeight="bold"
        letterSpacing="wide"
        fontSize="md"
        textTransform="uppercase"
      >
        {board.name}
      </Box>
    </Box>
  )
}
