import React from 'react'
import { maps } from '../../enum'

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
  teams: TeamList[] | null,
  teamA: TeamList | null,
  teamB: TeamList | null
}

export const TeamSelectionModal = ({
  isOpen,
  onClose,
  teams,
  onSelected,
  teamA,
  teamB
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
      <div className='selection-modal'>
        {teams.map(team => {
          const isDisabled = (teamA !== null && teamA._id === team._id)
            || (teamB !== null && teamB._id === team._id)

          return (
            <div
              key={team._id}
              className={`selection-box ${isDisabled && 'disabled'}`}
              onClick={!isDisabled ? onSelected(team) : () => {}}
            >
              <Image
                src={`/${team.logoPath === null ? 'static/default/default-team.png' : team.logoPath}`}
                wrapped
                size='small'
                centered
              />
              <p>{team.nameShort}</p>
            </div>
          )
        })}
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

interface MapSelectionProps {
  isOpen: boolean,
  onClose: () => void,
  onSelected: (map: string) => () => void
}

export const MapSelectionModal = ({
  isOpen,
  onClose,
  onSelected
}: MapSelectionProps) => (
  <Modal open={isOpen} onClose={onClose} centered={false} basic size='large'>
    <Header className='selection-header' icon='users' content='Select Team' />
    <div className='selection-modal'>
      {maps.map(map => (
        <div
          key={map.key}
          className='selection-box'
          onClick={onSelected(map.name)}
        >
          <Image
            src={`/static/map/${map.name}_overview.jpg`}
            wrapped
            size='small'
            centered
          />
          <p>{map.name}</p>
        </div>
      ))}
    </div>
  </Modal>
)
