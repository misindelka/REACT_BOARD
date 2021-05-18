import * as React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

const MenuToggle = ({ onClick }) => {
  return (
    <IconButton
      d={{ sm: 'none' }}
      aria-label="Open menu"
      icon={<HamburgerIcon />}
      onClick={onClick}
    />
  )
}

MenuToggle.propTypes = {
  onClick: PropTypes.func,
}

export { MenuToggle }
