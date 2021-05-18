import * as React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/react'
import { Link as RouterLink, useMatch } from 'react-router-dom'

const NavButton = ({ to, icon, ...rest }) => {
  const match = useMatch(to)
  const props = { ...rest }

  if (match) {
    props['aria-current'] = 'page'
  }

  return (
    <Button
      as={RouterLink}
      to={to}
      justifyContent="flex-start"
      leftIcon={icon}
      colorScheme="whiteAlpha"
      _hover={{ bg: '#ebedf0' }}
      color="black"
      {...props}
    />
  )
}

NavButton.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node,
}

export { NavButton }
