/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import * as React from 'react'
import { Text, Box } from '@chakra-ui/react'
import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { createTask, removeTask } from '../../../utils/api'
import { AlertDeleteTask } from './AlertDeleteForm'
// import { id } from 'date-fns/locale'

// eslint-disable-next-line react/prop-types
export const Task = ({ task, boardId, handleEditTask, taskGroupId, fetchBoard, taskIds }) => {
  const handleCopyTask = async () => {
    await createTask(boardId, taskGroupId, { ...task, id: null })
    fetchBoard()
  }
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Box>
      <>
        {taskIds.includes(task.id) && (
          <Box
            key={task.id}
            m="2"
            maxW="md"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            background="white"
            shadow="2"
          >
            <EditIcon
              cursor="pointer"
              onClick={() => {
                handleEditTask(task)
              }}
              float="left"
              boxSize="1.3em"
              m="2"
            />
            <CopyIcon onClick={handleCopyTask} cursor="pointer" boxSize="1.3em" m="2" />
            <DeleteIcon
              cursor="pointer"
              onClick={() => {
                setIsOpen(true)
              }}
              float="right"
              boxSize="1.3em"
              m="2"
            />
            <Box textAlign="center">
              <Text fontWeight="bold" textTransform="uppercase" pt="3" fontSize="xl">
                {task.name}
              </Text>
              <Text p="3">{task.content}</Text>
              <Text pb="2" color="gray" fontSize="11px">
                {task.date}
              </Text>
            </Box>
          </Box>
        )}
      </>
      <AlertDeleteTask
        fetchBoard={fetchBoard}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        removeTask={removeTask}
        boardId={boardId}
        taskId={task.id}
      />
    </Box>
  )
}
