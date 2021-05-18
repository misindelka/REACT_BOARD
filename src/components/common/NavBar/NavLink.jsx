import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@chakra-ui/react'
import { Link as RouterLink, useMatch } from 'react-router-dom'

export const NavLink = ({ to, ...rest }) => {
  const match = useMatch(to)
  const props = { ...rest }

  if (match) {
    props['aria-current'] = 'page'
  }

  return (
    <Link
      as={RouterLink}
      to={to}
      fontWeight="bold"
      _activeLink={{ color: 'blue.500' }}
      {...props}
    />
  )
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
}
