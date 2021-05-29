/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import * as React from 'react'
import { Box } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { updateTask, updateTaskGroup } from '../../../utils/api'
import { EditGroupForm } from '../Components/EditGroupForm'
import { Tasks } from './Tasks/Tasks'

// eslint-disable-next-line react/prop-types
export const Group = ({ group, board, fetchBoard, hoverColor }) => {
  const tasks = board.tasks?.filter((task) => group.taskIds.includes(task.id))
  const [isOpen, setIsOpen] = React.useState(false)

  const handleUpdateGroup = (editedGroup) => {
    updateTaskGroup(editedGroup.id, editedGroup)
    const filteredTasks = tasks.filter((i) => editedGroup.taskIds.includes(i.id))
    const updatedTasksBoardIds = filteredTasks.reduce((acc, currVal) => {
      return [...acc, { ...currVal, boardId: editedGroup.boardId }]
    }, [])
    updatedTasksBoardIds.map((i) => updateTask(i.id, i))
    fetchBoard()
  }

  return (
    <>
      <Box
        key={group.id}
        shadow={group.taskIds < 1 ? 'none' : 'base'}
        minH="17.5vh"
        maxH={['78vh', '83.3vh']}
        minW="350px"
        borderWidth={group.taskIds < 1 ? '0px' : '1px'}
        borderRadius="lg"
        backgroundColor={group.taskIds < 1 ? 'gray.100' : '#F7FAFC'}
        overflowY={['scroll', 'hidden']}
      >
        <Box
          m="2"
          backgroundColor={board.color}
          textColor="white"
          borderRadius="lg"
          textTransform="uppercase"
          letterSpacing="wide"
          fontWeight="bold"
          textAlign="center"
          p="5"
          fontSize="2xl"
        >
          <EditGroupForm
            hoverColor={hoverColor}
            currentGroup={group}
            handleUpdateGroup={handleUpdateGroup}
            boardColor={board.color}
            currentGroupName={group.name}
          />
          {group.name}
          <DeleteIcon
            cursor="pointer"
            onClick={() => {
              setIsOpen(true)
            }}
            float="right"
            w="4"
            h="8"
          />
        </Box>
        <Tasks group={group} board={board} fetchBoard={fetchBoard} hoverColor />
      </Box>
    </>
  )
}
