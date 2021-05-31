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
} from '@chakra-ui/react'
import { CirclePicker } from 'react-color'

export const AddBoardForm = ({
  newBoard,
  isOpen,
  onClose,
  setBoardColor,
  handleAddNewBoard,
  handleSubmitForm,
  boardColor,
}) => {
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
            <center>
              <CirclePicker name="color" onChange={(color) => setBoardColor(color.hex)} />
            </center>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={!newBoard.name}
            onClick={handleSubmitForm}
            background={boardColor}
            _hover={{
              background: boardColor,
            }}
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
