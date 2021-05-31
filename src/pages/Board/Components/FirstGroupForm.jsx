/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { GridItem, Heading } from '@chakra-ui/layout'
import * as React from 'react'

export const FirstGroupForm = ({ handleSubmitNewGroup, color, newGroup, handleAddNewGroup }) => {
  return (
    <GridItem mt="7vh" colSpan={{ base: '2', lg: '4' }}>
      <Heading p="10" textAlign="center">
        Let's create your first group!
      </Heading>
      <center>
        <Input
          outline="none"
          m="10"
          fontSize="30px"
          textAlign="center"
          w="33%"
          name="name"
          color={color}
          required
          variant="flushed"
          size="lg"
          value={newGroup.name}
          onChange={handleAddNewGroup}
          placeholder="Choose a name for you group"
        />
      </center>
      <center>
        <Button
          isDisabled={!newGroup.name}
          onClick={handleSubmitNewGroup}
          w="20%"
          mt="3"
          background={color}
          color="white"
          _hover={{
            background: color,
          }}
        >
          Add
        </Button>
      </center>
    </GridItem>
  )
}
