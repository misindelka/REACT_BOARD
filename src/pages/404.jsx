import * as React from 'react'
import { Box, Center } from '@chakra-ui/react'
import reactBg from '../assets/space.jpg'

const Boards = () => {
  return (
    <Box background={`url('${reactBg}') center / cover no-repeat`} h="94vh">
      <Center color="white" fontWeight="bold" fontSize="6xl" h="100%">
        404:Page not found
      </Center>
    </Box>
  )
}

export default Boards
