// @flow
import React from 'react'

import {
  Icon,
  Modal,
  Button,
} from 'semantic-ui-react'

type ConfirmModalProps = {
  isOpen: boolean,
  toggleModal: () => void,
  onDelete: () => void,
  modalHeader: string,
  modalBody: string
}

export const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    isOpen,
    toggleModal,
    onDelete,
    modalBody,
    modalHeader
  } = props

  return (
    <Modal size={'tiny'} open={isOpen} onClose={toggleModal}>
      <Modal.Header>{modalHeader}</Modal.Header>
      <Modal.Content>
        <p>{modalBody}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={toggleModal}>No</Button>
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content='Yes'
          onClick={onDelete}
        />
      </Modal.Actions>
    </Modal>
  )
}