/* eslint-disable import/no-extraneous-dependencies */
import { Button } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import * as React from 'react'

export const ColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode('dark')
  return (
    <header>
      <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
    </header>
  )
}
