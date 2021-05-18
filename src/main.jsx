import * as React from 'react'
import { render } from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

const Root = () => (
  <ChakraProvider>
    <Router>
      <App />
    </Router>
  </ChakraProvider>
)

render(<Root />, document.getElementById('root'))
