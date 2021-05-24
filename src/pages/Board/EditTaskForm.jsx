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

export const EditTaskForm = ({
  handleUpdateTask,
  isOpen,
  onClose,
  groupId,
  boardColor,
  currentTask,
}) => {
  const [editedTask, setEditedTask] = React.useState(currentTask)

  React.useEffect(() => {
    setEditedTask(currentTask)
  }, [currentTask])

  const handleEditTask = (e) => {
    const { name, value } = e.target
    setEditedTask({ ...editedTask, [name]: value })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleUpdateTask(editedTask, groupId)
    onClose()
    setEditedTask(currentTask)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit task</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl mt={4}>
            <Input
              name="name"
              size="sm"
              value={editedTask.name}
              onChange={handleEditTask}
              variant="flushed"
              placeholder="Task name"
            />
          </FormControl>
          <FormControl mt={4}>
            <Textarea
              name="content"
              value={editedTask.content}
              onChange={handleEditTask}
              placeholder="Task content"
              size="sm"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={!editedTask.name || !editedTask.content}
            onClick={(e) => handleSubmitForm(e)}
            color="white"
            background={boardColor}
            mr={3}
          >
            Add task
          </Button>
          <Button
            onClick={() => {
              setEditedTask(currentTask)
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
