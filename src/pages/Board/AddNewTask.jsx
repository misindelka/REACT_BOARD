/* eslint-disable react/prop-types */
import * as React from 'react'

import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  Modal,
  Textarea,
  Input,
} from '@chakra-ui/react'

const initialNewTaskValue = {
  name: '',
  content: '',
}

export const AddNewTask = ({ handleCreateTask, isOpen, onClose, groupId, boardColor }) => {
  const [newTask, setNewTask] = React.useState(initialNewTaskValue)

  const handleAddNewTask = (e) => {
    const { name, value } = e.target
    setNewTask({ ...newTask, [name]: value })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleCreateTask(newTask, groupId)
    onClose()
    setNewTask(initialNewTaskValue)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new task</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl mt={4}>
            <Input
              name="name"
              size="sm"
              value={newTask.name}
              onChange={handleAddNewTask}
              variant="flushed"
              placeholder="Task name"
            />
          </FormControl>
          <FormControl mt={4}>
            <Textarea
              name="content"
              value={newTask.content}
              onChange={handleAddNewTask}
              placeholder="Task content"
              size="sm"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={!newTask.name || !newTask.content}
            onClick={(e) => handleSubmitForm(e)}
            color="white"
            background={boardColor}
            mr={3}
          >
            Add task
          </Button>
          <Button
            onClick={() => {
              setNewTask(initialNewTaskValue)
              onClose()
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
