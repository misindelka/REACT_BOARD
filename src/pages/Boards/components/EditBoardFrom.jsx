/* eslint-disable react/prop-types */
import * as React from 'react'
import { CirclePicker } from 'react-color'
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

export const EditBoardForm = ({
  handleUpdateBoard,
  isOpenEdit,
  onCloseEdit,
  currentBoard,
  setBoardColor,
  boardColor,
}) => {
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
    handleUpdateBoard({ ...editedBoard, color: boardColor })
    setEditedBoard(editedBoard)
    onCloseEdit()
  }

  return (
    <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
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
            <CirclePicker
              name="color"
              onChange={(color) => {
                setBoardColor(color.hex)
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            background={boardColor}
            onClick={handleSubmitForm}
            colorScheme="blue"
            mr={3}
            _hover={{
              background: boardColor,
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
