/* eslint-disable react/prop-types */
import * as React from 'react'

import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react'

export const EditBoardForm = ({ handleUpdateBoard, isOpenEdit, onCloseEdit, currentBoard }) => {
  const [editedBoard, setEditedBoard] = React.useState(currentBoard)

  React.useEffect(() => {
    setEditedBoard(currentBoard)
  }, [currentBoard])

  const handleEditBoard = (e) => {
    const { name, value } = e.target
    setEditedBoard({ ...editedBoard, [name]: value })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleUpdateBoard(editedBoard)
    setEditedBoard(editedBoard)
    onCloseEdit()
  }

  return (
    <Modal isOpen={isOpenEdit} onCloseEdit={onCloseEdit}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit board</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl mt={4}>
            <Input
              name="name"
              required
              variant="flushed"
              value={editedBoard.name}
              onChange={handleEditBoard}
              placeholder="Board Name"
            />
          </FormControl>
          <FormControl mt={4}>
            <Select
              name="color"
              value={editedBoard.color}
              onChange={handleEditBoard}
              variant="flushed"
              placeholder="Board color"
            >
              <option value="blue.400">Blue</option>
              <option value="red.400">Red</option>
              <option value="green.400">Green</option>
              <option value="pink.400">Pink</option>
              <option value="purple.400">Purple</option>
              <option value="yellow.400">Yellow</option>
              <option value="cyan.400">Cyan</option>
              <option value="gray.500">Gray</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            background={editedBoard.color}
            onClick={handleSubmitForm}
            colorScheme="blue"
            mr={3}
            _hover={{
              background: editedBoard.color,
            }}
          >
            Update board
          </Button>
          <Button onClick={() => onCloseEdit()}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}