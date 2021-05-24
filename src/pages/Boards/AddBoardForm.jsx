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

const initialNewBoardValue = {
  name: '',
  color: 'blue.400',
}
export const AddBoardForm = ({ handleCreateBoard, isOpen, onClose }) => {
  const [newBoard, setNewBoard] = React.useState(initialNewBoardValue)

  const handleAddNewBoard = (e) => {
    const { name, value } = e.target
    setNewBoard({ ...newBoard, [`${name}`]: value })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleCreateBoard(newBoard)
    setNewBoard(initialNewBoardValue)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new board</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl mt={4}>
            <Input
              name="name"
              required
              variant="flushed"
              value={newBoard.name}
              onChange={handleAddNewBoard}
              placeholder="Board Name"
            />
          </FormControl>
          <FormControl mt={4}>
            <Select
              name="color"
              value={newBoard.color}
              onChange={handleAddNewBoard}
              variant="flushed"
              placeholder="Board color"
            >
              <option value="blue.400">Blue</option>
              <option value="red.400">Red</option>
              <option value="green.400">Green</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={!newBoard.name}
            onClick={handleSubmitForm}
            background={newBoard.color}
            mr={3}
            color="white"
          >
            Create board
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
