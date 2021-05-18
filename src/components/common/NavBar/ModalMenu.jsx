import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react'
import { BrandLogo } from './BrandLogo'

const ModalMenu = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="calc(100% - 32px)" maxW="auto" my={4}>
        <ModalHeader>
          <BrandLogo />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

ModalMenu.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export { ModalMenu }
