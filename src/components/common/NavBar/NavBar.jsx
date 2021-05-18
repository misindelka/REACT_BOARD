import * as React from 'react'
import { Box, HStack, Grid, useDisclosure } from '@chakra-ui/react'
import { MdDashboard } from 'react-icons/md'
import { HiViewBoards } from 'react-icons/hi'
import { MenuToggle } from './MenuToggle'
import { NavLink } from './NavLink'
import { NavButton } from './NavButton'
import { BrandLogo } from './BrandLogo'
import { ModalMenu } from './ModalMenu'

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box as="header" bg="white" borderBottom="1px" borderBottomColor="gray.200">
      <HStack mx="auto" justify="space-between" maxW="7xl" px={{ base: 6, md: 8 }} py={4}>
        <HStack align="center" spacing={10}>
          <BrandLogo />

          <HStack align="center" d={{ base: 'none', sm: 'flex' }} spacing={8}>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/boards">Boards</NavLink>
          </HStack>
        </HStack>

        <HStack>
          <MenuToggle onClick={onToggle} />
          <ModalMenu isOpen={isOpen} onClose={onToggle}>
            <Grid templateColumns="repeat(2, minmax(0px, 1fr))" gap={6}>
              <NavButton to="/" icon={<MdDashboard />} onClick={onToggle}>
                Dashboard
              </NavButton>
              <NavButton to="/boards" icon={<HiViewBoards />} onClick={onToggle}>
                Boards
              </NavButton>
            </Grid>
          </ModalMenu>
        </HStack>
      </HStack>
    </Box>
  )
}

NavBar.propTypes = {}

export { NavBar }
