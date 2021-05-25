/* eslint-disable react/prop-types */
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
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
    >
      <Flex justifyContent="center" alignItems="center" h="100px">
        <EditIcon
          cursor="pointer"
          pt="3"
          w="4"
          h="10"
          float="left"
          bg="none"
          onClick={() => handleEditBoard(board)}
        />
        <Spacer />
        <Text as={Link} to={`/boards/${board.id}`} textAlign="center">
          {board.name}
        </Text>
        <Spacer />
        <DeleteIcon
          cursor="pointer"
          pt="3"
          w="4"
          h="10"
          float="right"
          bg="none"
          onClick={() => handleRemoveBoard(board.id)}
        />
      </Flex>
      <Box />
    </Box>
  )
}
