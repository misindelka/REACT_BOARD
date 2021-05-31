/* eslint-disable react/prop-types */
import { Avatar, AvatarGroup, Box, Text } from '@chakra-ui/react'
import { uniqueId } from 'lodash'
import * as React from 'react'
import { Link } from 'react-router-dom'

export const BoardInfo = ({ board, taskGroups, tasks }) => {
  return (
    <>
      <Text as={Link} to={`/boards/${board.id}`} textAlign="center">
        <Text fontWeight="bold" fontSize="20px">
          {board.name}
        </Text>
        <Text>Groups : {taskGroups.length}</Text>
        <Text>
          Tasks :
          {taskGroups
            .map((group) => {
              return group.taskIds.length
            })
            .reduce((a, b) => a + b, 0)}
        </Text>
        <Text>
          Archived :
          {tasks
            .map((task) => {
              return task.archived
            })
            .reduce((a, b) => a + b, 0)}
        </Text>
      </Text>
      <Box mt="6" mb="-6">
        <AvatarGroup spacing="ľ" size="sm" justifyContent="center" max={8}>
          {board.members.map((member) => (
            <Avatar name={member} key={uniqueId()} />
          ))}
        </AvatarGroup>
      </Box>
    </>
  )
}
