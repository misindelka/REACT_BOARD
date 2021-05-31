/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import * as React from 'react'
import { Text, Box, Badge } from '@chakra-ui/react'

import { createTask, removeTask } from '../../../utils/api'
import { AlertDeleteTask } from './AlertDeleteForm'
import { TaskMenu } from '../Components/TaskMenu'

// eslint-disable-next-line react/prop-types
export const Task = ({
  task,
  boardId,
  handleEditTask,
  handleArchiveTask,
  taskGroupId,
  fetchBoard,
  taskIds,
}) => {
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
            display={task.archived ? 'none' : 'block'}
            key={task.id}
            m="2"
            maxW="md"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            background="white"
            shadow="2"
          >
            {task.priority ? (
              <Badge
                colorScheme={
                  task.priority === 'Low' ? 'green' : task.priority === 'Medium' ? 'yellow' : 'red'
                }
                ml="3"
                mt="3"
              >
                {task.priority}
              </Badge>
            ) : (
              ''
            )}
            <TaskMenu
              setIsOpen={setIsOpen}
              task={task}
              handleCopyTask={handleCopyTask}
              handleEditTask={handleEditTask}
              handleArchiveTask={handleArchiveTask}
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
