/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import * as React from 'react'

export const AlertDeleteBoard = ({ isOpen, setIsOpen, boardId, boardName, handleRemoveBoard }) => {
  return (
    <AlertDialog isOpen={isOpen}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete board
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure to delete board <strong>{boardName}</strong>?<br /> You can't undo this
            action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => handleRemoveBoard(boardId)} colorScheme="red" ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export const AlertDeleteGroup = ({
  isOpen,
  setIsOpen,
  removeTaskGroup,
  groupName,
  groupId,
  fetchBoard,
}) => {
  const handleRemoveGroup = async () => {
    await removeTaskGroup(groupId)
    fetchBoard()
  }
  return (
    <AlertDialog isOpen={isOpen}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete group
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure to delete group <strong>{groupName}</strong>?<br /> You can't undo this
            action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleRemoveGroup} colorScheme="red" ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export const AlertDeleteTask = ({ isOpen, setIsOpen, removeTask, boardId, taskId, fetchBoard }) => {
  const handleRemoveTask = async () => {
    await removeTask(boardId, taskId)
    fetchBoard()
  }

  return (
    <AlertDialog isOpen={isOpen}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete task
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure to delete this task?
            <br /> You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleRemoveTask} colorScheme="red" ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
