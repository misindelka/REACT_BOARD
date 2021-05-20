import * as React from 'react'
import { Box, Button, Center, Heading } from '@chakra-ui/react'
import TextAnimation from 'react-animate-text'
import { Link } from 'react-router-dom'
import reactBg from '../assets/react_bg.png'

const Dashboard = () => {
  return (
    <Box background={`url('${reactBg}') center / cover no-repeat`} h="92vh">
      <Center h="30vh">
        <div>
          <Heading fontSize={['3xl', '5xl']} color="white" textAlign="center" mb="4">
            <TextAnimation>Welcome to ReactBoard!</TextAnimation>
          </Heading>
        </div>
      </Center>
      <Center>
        <Button
          color="white"
          mt="45vh"
          w="300px"
          size="lg"
          variant="outline"
          as={Link}
          to="/boards"
        >
          Let's see some boards
        </Button>
      </Center>
    </Box>
  )
}

export default Dashboard
