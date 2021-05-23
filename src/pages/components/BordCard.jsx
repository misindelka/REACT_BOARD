/* eslint-disable react/prop-types */
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button } from '@chakra-ui/react'

export const BoardCard = ({ board, handleRemoveBoard }) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      backgroundColor={board.color || 'blue.400'}
      shadow="2"
      color="white"
      m="3"
    >
      <Box
        display="flex"
        flexDirection="column"
        p="4"
        alignItems="center"
        minH="10vh"
        as={Link}
        to={`/boards/${board.id}`}
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
      <Box m="3" display="flex" justifyContent="space-between">
        <Button bg="none">EDIT</Button>
        <Button bg="none" onClick={() => handleRemoveBoard(board.id)}>
          DELETE
        </Button>
      </Box>
    </Box>
  )
}
