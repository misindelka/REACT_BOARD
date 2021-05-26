/* eslint-disable react/prop-types */
import * as React from 'react'
import {
  Box,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'

const initialGroupValue = {
  name: '',
  boardId: null,
}

export const AddNewGroup = ({
  handleCreateGroup,
  boardId,
  boardColor,
  hoverColor,
  fetchGroups,
}) => {
  const [newGroup, setNewGroup] = React.useState(initialGroupValue)

  const handleAddNewGroup = (e) => {
    const { name, value } = e.target
    setNewGroup({ ...newGroup, [name]: value, boardId })
  }
  const handleSubmitNewGroup = (e) => {
    e.preventDefault()
    handleCreateGroup(newGroup)
    setNewGroup(initialGroupValue)
    fetchGroups()
  }

  return (
    <Box
      textColor="white"
      borderRadius="lg"
      textTransform="uppercase"
      letterSpacing="wide"
      fontWeight="bold"
      textAlign="center"
      p="4"
    >
      <Popover>
        <PopoverTrigger>
          <Button
            textTransform="uppercase"
            letterSpacing="wide"
            fontWeight="bold"
            color="white"
            leftIcon={<PlusSquareIcon />}
            p="9"
            mt="-2"
            w="100%"
            background={boardColor}
            _hover={{
              background: hoverColor,
            }}
          >
            Add new group
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader color="blackAlpha.700">Please input group name</PopoverHeader>
          <PopoverBody>
            <Input
              name="name"
              color="black"
              variant="flushed"
              placeholder="Group name here"
              value={newGroup.name}
              onChange={handleAddNewGroup}
            />
            <Button
              isDisabled={!newGroup.name}
              onClick={handleSubmitNewGroup}
              w="80%"
              mt="3"
              background={boardColor}
              color="white"
              _hover={{
                background: hoverColor,
              }}
            >
              Add
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
