/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import * as React from 'react'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { updateTask, updateTaskGroup } from '../../../utils/api'

import { Group } from './Group'

// eslint-disable-next-line react/prop-types
export const TaskGroups = ({ board, fetchBoard, hoverColor }) => {
  return (
    <>
      {board.taskGroups?.map((group) => (
        <Group
          key={group.id}
          group={group}
          board={board}
          fetchBoard={fetchBoard}
          hoverColor={hoverColor}
        />
      ))}
    </>
  )
}
