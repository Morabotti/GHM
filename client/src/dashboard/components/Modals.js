// @flow
import React from 'react'

import type {
  Player,
  Team
} from '../types'

import {
  Icon,
  Modal,
  Button,
  Image,
  Header,
  Flag
} from 'semantic-ui-react'

type ConfirmModalProps = {
  isOpen: boolean,
  toggleModal: () => void,
  onDelete: () => void,
  modalHeader: string,
  modalBody: string,
  affectedTargets?: Array<any>
}

export const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    isOpen,
    toggleModal,
    onDelete,
    modalBody,
    modalHeader,
    affectedTargets
  } = props

  return (
    <Modal size={'tiny'} open={isOpen} onClose={toggleModal}>
      <Modal.Header>{modalHeader}</Modal.Header>
      <Modal.Content>
        <p>{modalBody}</p>
        {affectedTargets !== undefined && affectedTargets.length > 0 ? (
          <React.Fragment>
            <p>NOTE: Following action will delete these players too.</p>
            {affectedTargets.map(target =>
              <li key={target._id}>{target.gameName}</li>
            )}
          </React.Fragment>
        ) : null
        }
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

type ViewModalProps = {
  isOpen: boolean,
  toggleModal: () => void,
  currentView: Player,
  players: Array<Player>,
  currentTeam?: Team | null,
}

export const ViewPlayerModal = (props: ViewModalProps) => {
  const { isOpen, toggleModal, currentView, currentTeam, players } = props
  if(currentView === undefined ||
    currentTeam === null ||
    currentTeam === undefined
  ) return <Modal open={isOpen} onClose={toggleModal}></Modal>

  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <Modal.Header>Player details</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size='medium'
          src={`/${currentView.imagePath === null
            ? 'static/default/default-player.png'
            : currentView.imagePath}`}
        />
        <Modal.Description>
          <Header>{currentView.firstName} '{currentView.gameName}' {currentView.lastName}</Header>
          <p>
            <Flag name={currentView.country} />
            <span>{currentView.country.toUpperCase()}</span>
          </p>
          <p>
            <Image
              src={`/${currentTeam.logoPath === null ? 'static/default/default-team.png' : currentTeam.logoPath}`}
              avatar
            />
            <span>{currentTeam.teamNameLong}</span>
          </p>
          <p>Team with:</p>
          {players
            .filter(player => (player.team === currentTeam.teamNameShort && player.steam64id !== currentView.steam64id))
            .map(player => (
              <li key={player._id}>
                <Flag name={player.country} />
                {player.firstName} <b>'{player.gameName}'</b> {player.lastName}
              </li>
            )
          )}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

type ViewTeamModalProps = {
  isOpen: boolean,
  toggleModal: () => void,
  currentTeam: Team,
  currentPlayers: Array<Player>,
}

export const ViewTeamModal = (props: ViewTeamModalProps) => {
  const { isOpen, toggleModal, currentTeam, currentPlayers } = props
  if(currentTeam === undefined ||
    currentTeam === null ||
    currentTeam === undefined
  ) return <Modal open={isOpen} onClose={toggleModal}></Modal>

  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <Modal.Header>Team details</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size='medium'
          src={`/${currentTeam.logoPath === null
            ? 'static/default/default-player.png'
            : currentTeam.logoPath}`}
        />
        <Modal.Description>
          <Header>{currentTeam.teamNameLong} ({currentTeam.teamNameShort})</Header>
          <p>
            <Flag name={currentTeam.country} />
            <span>{currentTeam.country.toUpperCase()}</span>
          </p>
          <p>Team members: </p>
          {currentPlayers.map(target => (
            <li key={target._id}>
              <Flag name={target.country} />
              {target.firstName} <b>'{target.gameName}'</b> {target.lastName}
            </li>
          ))}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}