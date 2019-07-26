import React from 'react'

import {
  TeamList,
  TeamSpecific
} from '../types'

import {
  Modal,
  Button,
  Image,
  Header,
  Loader
} from 'semantic-ui-react'

interface TeamSelectionProps {
  isOpen: boolean,
  onClose: () => void,
  onSelected: (team: TeamList) => () => void,
  teams: TeamList[] | null
}

export const TeamSelectionModal = ({
  isOpen,
  onClose,
  teams,
  onSelected
}: TeamSelectionProps) => {
  if (teams === null) {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Loader size='massive'>Loading</Loader>
      </Modal>
    )
  }

  return (
    <Modal open={isOpen} onClose={onClose} centered={false} basic size='large'>
      <Header className='selection-header' icon='users' content='Select Team' />
      <div className='team-selection-modal'>
        {teams.map(team => (
          <div key={team._id} className='selection-box' onClick={onSelected(team)}>
            <Image
              src={`/${team.logoPath === null ? 'static/default/default-team.png' : team.logoPath}`}
              wrapped
              size='small'
              centered
            />
            <p>{team.nameShort}</p>
          </div>
        ))}
      </div>
    </Modal>
  )
}

interface ConfirmModalProps {
  isOpen: boolean,
  onClose: () => void,
  onDelete: () => void,
  modalHeader: string,
  modalBody: string,
  team?: TeamSpecific | null
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onDelete,
  modalBody,
  modalHeader,
  team
}: ConfirmModalProps) => (
  <Modal size={'tiny'} open={isOpen} onClose={onClose}>
    <Modal.Header>{modalHeader}</Modal.Header>
    <Modal.Content>
      <p>{modalBody}</p>
      {team !== undefined && team !== null && (
        <>
          {team.players.length !== 0 && (
            <p>NOTE: Following action will delete these players too.</p>
          )}
          {team.players.map(player => (
            <li key={player._id}>{player.gameName}</li>
          ))}
        </>
      )}
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={onClose}>No</Button>
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
