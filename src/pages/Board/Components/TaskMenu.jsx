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
  Stack,
  Badge,
} from '@chakra-ui/react'

import { ChevronDownIcon, CopyIcon, DeleteIcon, EditIcon, ViewOffIcon } from '@chakra-ui/icons'
import { getBoard, updateTask } from '../../../utils/api'
import { useFetch } from '../../../hooks/useFetch'

export const TaskMenu = ({
  setIsOpen,
  task,
  handleCopyTask,
  handleEditTask,
  handleArchiveTask,
}) => {
  const { fetchData: fetchBoard } = useFetch(getBoard)
  const handleEditLabel = async (e) => {
    await updateTask(task.id, { ...task, priority: e.target.textContent })
    fetchBoard()
  }
  return (
    <Popover>
      <PopoverTrigger>
        <ChevronDownIcon float="right" background="none" boxSize="1.8em" ml="-5" mt="1" />
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="35">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody p="5" textAlign="center">
            <Box
              cursor="pointer"
              onClick={() => {
                handleEditTask(task)
              }}
            >
              Edit task
              <EditIcon boxSize="1.3em" m="2" />
            </Box>
            <Box
              onClick={() => {
                handleArchiveTask(task)
              }}
              cursor="pointer"
            >
              Archive task
              <ViewOffIcon boxSize="1.3em" m="2" />
            </Box>
            <Box onClick={handleCopyTask} cursor="pointer">
              Copy task
              <CopyIcon boxSize="1.3em" m="2" />
            </Box>
            <Box
              cursor="pointer"
              onClick={() => {
                setIsOpen(true)
              }}
            >
              Delete task
              <DeleteIcon boxSize="1.3em" m="2" />
            </Box>
            <Box mt="2">
              <Stack direction="row" onClick={(e) => handleEditLabel(e)}>
                <Badge cursor="pointer" variant="subtle" colorScheme="green">
                  Low
                </Badge>
                <Badge cursor="pointer" variant="subtle" colorScheme="yellow">
                  Medium
                </Badge>
                <Badge cursor="pointer" variant="subtle" colorScheme="red">
                  High
                </Badge>
              </Stack>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
