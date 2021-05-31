/* eslint-disable react/prop-types */
import * as React from 'react'
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Portal,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from '@chakra-ui/react'

import { ChevronDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { getBoards, updateBoard } from '../../../utils/api'
import { useFetch } from '../../../hooks/useFetch'

export const BoardMenu = ({ setIsOpen, handleEditBoard, board }) => {
  const [boardMember, setBoardMember] = React.useState('')
  const { fetchData: fetchBoards } = useFetch(getBoards)
  const handleAddBoardMember = async () => {
    await updateBoard(board.id, { ...board, members: [...board.members, boardMember] })
    fetchBoards()
  }
  return (
    <Popover>
      <PopoverTrigger>
        <ChevronDownIcon ml="90%" mt="-10" background="none" boxSize="1.8em" />
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="45">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody p="7" textAlign="center">
            <Box onClick={() => handleEditBoard(board)} cursor="pointer">
              Edit board
              <EditIcon ml="3" bg="none" />
            </Box>
            <Box cursor="pointer" onClick={() => setIsOpen(true)}>
              Delete board <DeleteIcon bg="none" />
            </Box>
            <Box mt="2">
              <InputGroup size="md">
                <Input
                  onChange={(e) => setBoardMember(e.target.value)}
                  value={boardMember}
                  placeholder="Add board member"
                />
                <InputRightElement>
                  <Button onClick={handleAddBoardMember} size="sm">
                    +
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
