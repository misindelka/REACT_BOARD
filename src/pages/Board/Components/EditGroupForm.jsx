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

export const EditGroupForm = ({ boardColor, currentGroup, handleUpdateGroup, hoverColor }) => {
  const [editedGroup, setEditedGroup] = React.useState(currentGroup)
  const [boards, setBoards] = React.useState()

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoards()
        setBoards(data)
      }
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }, [])

  const handleEditGroup = (e) => {
    const { name, value } = e.target
    setEditedGroup({ ...editedGroup, [name]: value })
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
          background={boardColor}
          float="left"
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
