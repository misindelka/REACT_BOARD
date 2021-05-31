/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { GridItem, Heading } from '@chakra-ui/layout'
import * as React from 'react'
import { CirclePicker } from 'react-color'

export const FirstBoardForm = ({
  boardColor,
  newBoard,
  handleAddNewBoard,
  setBoardColor,
  handleSubmitForm,
}) => {
  return (
    <GridItem mt="7vh" colSpan={{ base: '2', lg: '4' }}>
      <Heading color={boardColor} p="10" textAlign="center">
        Let's create your first board!
      </Heading>
      <center>
        <Input
          outline="none"
          m="10"
          fontSize="30px"
          textAlign="center"
          w="33%"
          name="name"
          color={boardColor}
          required
          variant="flushed"
          size="lg"
          value={newBoard.name}
          onChange={handleAddNewBoard}
          placeholder="Choose a name for you board"
        />
      </center>
      <center>
        <Heading mb="10" fontSize="1.8em" color={boardColor}>
          Choose a color for your board
        </Heading>
        <CirclePicker
          name="color"
          onChange={(color) => {
            setBoardColor(color.hex)
          }}
        />
      </center>
      <center>
        <Button
          mt="10"
          size="lg"
          isDisabled={!newBoard.name}
          onClick={handleSubmitForm}
          background={boardColor}
          _hover={{
            background: boardColor,
          }}
          color="white"
        >
          Create board
        </Button>
      </center>
    </GridItem>
  )
}
