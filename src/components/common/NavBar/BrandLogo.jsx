import * as React from 'react'
import PropTypes from 'prop-types'
import { Text, Icon } from '@chakra-ui/react'
import { DiReact } from 'react-icons/di'

const BrandLogo = ({ size = '3xl' }) => {
  return (
    <Text as="a" href="/" fontSize={size} fontWeight="bold" lineHeight="1">
      <Icon as={DiReact} color="blue.400" mr={2} />
      ReactBoard
    </Text>
  )
}

BrandLogo.propTypes = {
  size: PropTypes.string,
}

export { BrandLogo }
