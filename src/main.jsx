import * as React from 'react'
import { render } from 'react-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import theme from './pages/Theme'

const Root = () => (
  <ChakraProvider>
    <Router>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </Router>
  </ChakraProvider>
)

render(<Root />, document.getElementById('root'))
