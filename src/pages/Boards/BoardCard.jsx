/* eslint-disable react/prop-types */
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

export const BoardCard = ({ board, handleRemoveBoard, handleEditBoard }) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      backgroundColor={board.color || 'blue.400'}
      shadow="2"
      color="white"
      m="3"
      pl="5"
      pr="5"
      pt="6"
      pb="1"
    >
      <EditIcon pt="3" w="4" h="10" float="left" bg="none" onClick={() => handleEditBoard(board)} />
      <DeleteIcon
        pt="3"
        w="4"
        h="10"
        float="right"
        bg="none"
        onClick={() => handleRemoveBoard(board.id)}
      />
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
      <Box />
    </Box>
  )
}
