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
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

export const EditGroupForm = ({
  boardColor,
  currentGroupName,
  currentGroupId,
  handleEditNewGroup,
}) => {
  const [editedGroupName, setEditedGroupName] = React.useState(currentGroupName)

  //   React.useEffect(() => {
  //     setEditedTask(currentTask)
  //   }, [currentTask])

  //   const handleSubmitForm = (e) => {
  //     e.preventDefault()
  //     handleUpdateTask(editedTask, groupId)
  //     onClose()
  //     setEditedTask(currentTask)
  //   }

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
          Please input group name
        </PopoverHeader>
        <PopoverBody>
          <Input
            name="name"
            color="black"
            variant="flushed"
            placeholder="Group name here"
            value={editedGroupName}
            onChange={(e) => setEditedGroupName(e.target.value)}
          />
          <Button
            isDisabled={!editedGroupName}
            onClick={handleEditNewGroup(currentGroupId, { name: editedGroupName })}
            w="80%"
            mt="3"
            background={boardColor}
            color="white"
          >
            Edit
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
