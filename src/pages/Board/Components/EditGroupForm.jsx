/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import * as React from 'react'
import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Select,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { getBoards } from '../../../utils/api'
import { useFetch } from '../../../hooks/useFetch'

export const EditGroupForm = ({ boardColor, currentGroup, handleUpdateGroup, hoverColor }) => {
  const [editedGroup, setEditedGroup] = React.useState(currentGroup)
  const { data: boards } = useFetch(getBoards)

  const handleEditGroup = (e) => {
    const { name, value } = e.target
    setEditedGroup({ ...editedGroup, [name]: editedGroup.boardId ? parseFloat(value) : value })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleUpdateGroup(editedGroup)
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          color="white"
          leftIcon={<EditIcon />}
          float="left"
          background="none"
          w="4"
          mt="-1"
          _hover={{
            background: 'transparent',
          }}
          _focus={{
            outline: 'none',
          }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontSize="md" color="blackAlpha.700">
          Change group name
        </PopoverHeader>
        <PopoverBody>
          <Input
            name="name"
            color="black"
            variant="flushed"
            placeholder="Group name here"
            value={editedGroup.name}
            onChange={handleEditGroup}
          />
          <PopoverHeader fontSize="md" color="blackAlpha.700">
            Move to another board
          </PopoverHeader>
          <Select
            name="boardId"
            value={editedGroup.boardId}
            onChange={handleEditGroup}
            variant="flushed"
            color="black"
          >
            {boards?.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </Select>
          <Button
            isDisabled={!editedGroup.name}
            onClick={handleSubmitForm}
            w="80%"
            mt="3"
            background={boardColor}
            _hover={{
              background: hoverColor,
            }}
            color="white"
          >
            Edit
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
