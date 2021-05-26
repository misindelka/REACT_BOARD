import * as React from 'react'
import { Box, Button, Center, Heading } from '@chakra-ui/react'
import TextAnimation from 'react-animate-text'
import { Link } from 'react-router-dom'
import reactBg from '../assets/space.jpg'

const Dashboard = () => {
  return (
    <Box background={`url('${reactBg}') center / cover no-repeat`} h="92vh">
      <Center h="30vh">
        <div>
          <Heading pt="320" fontSize={['3xl', '6xl']} color="white" textAlign="center" mb="4">
            <TextAnimation>Welcome to ReactBoard!</TextAnimation>
          </Heading>
        </div>
      </Center>
      <Center>
        <Button p="8" color="black" mt="12vh" w="300px" size="lg" as={Link} to="/boards">
          Let's see some boards
        </Button>
      </Center>
    </Box>
  )
}

export default Dashboard
