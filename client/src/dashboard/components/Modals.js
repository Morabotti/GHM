// @flow
import React, { useState, useCallback, useEffect, useRef } from 'react'

import type {
  Player,
  Team,
  Country,
  NewTeam,
  ListElement
} from '../types'

import {
  Icon,
  Modal,
  Button,
  Image,
  Header,
  Flag,
  Grid,
  Form,
  Checkbox
} from 'semantic-ui-react'

type TeamSelectionProps = {
  isOpen: boolean,
  toggleModal: () => void,
  onSelected: (id: string) => () => Promise<void>,
  teams: Array<any>
}

export const TeamSelectionModal = (props: TeamSelectionProps) => {
  const { isOpen, toggleModal, teams, onSelected } = props
  return (
    <Modal open={isOpen} onClose={toggleModal} centered={false} basic size='large'>
      <Header className='selection-header' icon='users' content='Select Team' />
      <div className='team-selection-modal'>
        {teams.map((team, ind) =>(
          <div key={team._id} className='selection-box' onClick={onSelected(team._id)}>
            <Image
              src={`/${team.logoPath === null ? 'static/default/default-team.png' : team.logoPath}`}
              wrapped
              size='small'
              centered
            />
            <p>{team.teamNameShort}</p>
          </div>
        ))}
      </div>
    </Modal>
  )
}

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
  currentPlayers: Array<Player>
}

export const ViewTeamModal = (props: ViewTeamModalProps) => {
  const { isOpen, toggleModal, currentTeam, currentPlayers } = props

  if(currentTeam === undefined || currentTeam === null)
    return <Modal open={isOpen} onClose={toggleModal}></Modal>

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

type EditTeamModalProps = {
  isOpen: boolean,
  toggleModal: () => void,
  onEditDone: (newTeam: NewTeam) => () => void,
  currentTeam: Team,
  currentPlayers: Array<Player>,
  countries: Array<Country>
}

export const EditTeamModal = (props: EditTeamModalProps) => {
  const {
    isOpen,
    toggleModal,
    currentTeam,
    currentPlayers,
    countries,
    onEditDone
  } = props

  if(currentTeam === undefined || currentTeam === null)
    return <Modal open={isOpen} onClose={toggleModal}></Modal>

  const [nameShort, pNameShort] = useState(currentTeam.teamNameShort)
  const [nameLong, pNameLong] = useState(currentTeam.teamNameLong)
  const [country, pCountry] = useState(currentTeam.country)
  const [hasLogo, pHasLogo] = useState(currentTeam.hasLogo)
  const [logoPath, pLogoPath] = useState(currentTeam.logoPath)
  const [hasChangedLogo, pHasChangedLogo] = useState(false)
  const [newLogo, pNewLogoObj] = useState({})

  const fileInputRef: { current: any } = useRef(null);

  const resetValues = React.useCallback(() => {
    pNameShort(currentTeam.teamNameShort)
    pNameLong(currentTeam.teamNameLong)
    pCountry(currentTeam.country)
    pHasLogo(currentTeam.hasLogo)
    pLogoPath(currentTeam.logoPath)
    pHasChangedLogo(false)
    pNewLogoObj({})
    fileInputRef.current.value = ''
  }, [])

  const setNameShort = (e) => pNameShort(e.target.value)
  const setNameLong = (e) => pNameLong(e.target.value)
  const setCountry = (e, { value }) => pCountry(value)
  const setHasLogo = () => pHasLogo(!hasLogo)
  const setFileInputChange = (e) => {
    pNewLogoObj(e.target.files[0])
    pHasChangedLogo(true)
  }

  if(!hasLogo && hasChangedLogo) {
    pHasChangedLogo(false)
    pNewLogoObj({})
    fileInputRef.current.value = ''
  }
  
  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <Modal.Header>Edit team</Modal.Header>
      <Modal.Content image={hasLogo}>
        {hasLogo ?
          <Image
            wrapped
            size='medium'
            src={`/${hasChangedLogo 
              ? window.URL.createObjectURL(newLogo)
              : currentTeam.logoPath === null
              ? 'static/default/default-team.png'
              : currentTeam.logoPath}`}
          /> : null
        }
        <Modal.Description className='modal-container-desc'>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Team name (Short)'
                placeholder='Team name (Short)'
                value={nameShort}
                onChange={setNameShort}
              />
              <Form.Input
                fluid
                label='Team name (Long)'
                placeholder='Team name (Long)'
                value={nameLong}
                onChange={setNameLong}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
                label='Country'
                name='teamCountry'
                options={countries}
                value={country}
                onChange={setCountry}
                placeholder='Country'
              />
            </Form.Group>
            <Form.Field>
              <Checkbox
                label='Team has Image'
                name='teamHasLogo'
                checked={hasLogo}
                onChange={setHasLogo}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <div className={`dropbox-container ${!hasLogo ? 'invis' : ''}`}>
          <input
            onChange={setFileInputChange}
            className='inputfile-modal'
            ref={fileInputRef}
            type='file'
            name="file"
            accept="image/svg+xml, image/jpeg, image/png"
          />
        </div>
        <Button
          color='yellow'
          icon='redo'
          content='Reset'
          onClick={resetValues}
        />
        <Button
          color='green'
          icon='check'
          content='Save'
          onClick={onEditDone({
            nameShort, nameLong, country, hasLogo,
            logoPath, hasChangedLogo, newLogo
            })
          }
        />
        <Button
          color='red'
          icon='close'
          content='Close'
          onClick={toggleModal}
        />
      </Modal.Actions>
    </Modal>
  )
}

type EditPlayerModalProps = {
  isOpen: boolean,
  toggleModal: () => void,
  onEditDone: (newPlayer: any) => () => void,
  currentPlayer: Player,
  currentTeam?: Team | null,
  teams: Array<ListElement>,
  countries: Array<Country>
}

export const EditPlayerModal = (props: EditPlayerModalProps) => {
  const {
    isOpen,
    toggleModal,
    currentPlayer,
    currentTeam,
    countries,
    onEditDone,
    teams
  } = props

  if(currentPlayer === undefined || currentPlayer === null
    || currentTeam === undefined || currentTeam === null)
    return <Modal open={isOpen} onClose={toggleModal}></Modal>

  const [firstName, pFirstName] = useState(currentPlayer.firstName)
  const [lastName, pLastName] = useState(currentPlayer.lastName)
  const [gameName, pGameName] = useState(currentPlayer.gameName)
  const [team, pTeam] = useState(currentPlayer.team)
  const [country, pCountry] = useState(currentPlayer.country)
  const [steam64Id, pSteam64Id] = useState(currentPlayer.steam64id)
  const [hasImage, pHasImage] = useState(currentPlayer.hasImage)
  const [imagePath, pImagePath] = useState(currentPlayer.imagePath)
  const [hasNewImage, pHasNewImage] = useState(false)
  const [newImage, pNewImage] = useState({})

  const fileInputRef: { current: any } = useRef(null);

  const resetValues = React.useCallback(() => {
    pFirstName(currentPlayer.firstName)
    pLastName(currentPlayer.lastName)
    pGameName(currentPlayer.gameName)
    pTeam(currentPlayer.team)
    pCountry(currentPlayer.country)
    pSteam64Id(currentPlayer.steam64id)
    pHasImage(currentPlayer.hasImage)
    pImagePath(currentPlayer.imagePath)
    pHasNewImage(false)
    pNewImage({})
    fileInputRef.current.value = ''
  }, [])

  const setFirstName = (e) => pFirstName(e.target.value)
  const setGameName = (e) => pGameName(e.target.value)
  const setLastName = (e) => pLastName(e.target.value)
  const setSteam64Id = (e) => pSteam64Id(e.target.value)

  const setCountry = (e, { value }) => pCountry(value)
  const setTeam = (e, { value }) => pTeam(value)
  const setHasImage= () => pHasImage(!hasImage)
  const setFileInputChange = (e) => {
    pNewImage(e.target.files[0])
    pHasNewImage(true)
  }

  if(!hasImage && hasNewImage) {
    pHasNewImage(false)
    pNewImage({})
    fileInputRef.current.value = ''
  }
  
  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <Modal.Header>Edit player</Modal.Header>
      <Modal.Content image={hasImage}>
        {hasImage ?
          <Image
            wrapped
            size='medium'
            src={`/${hasNewImage 
              ? window.URL.createObjectURL(newImage)
              : currentPlayer.imagePath === null
              ? 'static/default/default-player.png'
              : currentPlayer.imagePath}`}
          /> : null
        }
        <Modal.Description className='modal-container-desc'>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='First name'
                placeholder='First name'
                value={firstName}
                onChange={setFirstName}
              />
              <Form.Input
                fluid
                label='Last name'
                placeholder='Last name'
                value={lastName}
                onChange={setLastName}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Game name'
                placeholder='Game name'
                value={gameName}
                onChange={setGameName}
              />
              <Form.Input
                fluid
                label='Steam64ID'
                placeholder='Steam64ID'
                value={steam64Id}
                onChange={setSteam64Id}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
                label='Team'
                options={teams}
                value={team}
                onChange={setTeam}
                placeholder='Country'
              />
              <Form.Select
                label='Country'
                options={countries}
                value={country}
                onChange={setCountry}
                placeholder='Country'
              />
            </Form.Group>
            <Form.Field>
              <Checkbox
                label='Player has Image'
                checked={hasImage}
                onChange={setHasImage}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <div className={`dropbox-container ${!hasImage ? 'invis' : ''}`}>
          <input
            onChange={setFileInputChange}
            className='inputfile-modal'
            ref={fileInputRef}
            type='file'
            name="file"
            accept="image/svg+xml, image/jpeg, image/png"
          />
        </div>
        <Button
          color='yellow'
          icon='redo'
          content='Reset'
          onClick={resetValues}
        />
        <Button
          color='green'
          icon='check'
          content='Save'
          onClick={onEditDone({
            firstName, lastName, gameName, team, country,
            steam64Id, hasImage, imagePath, hasNewImage,
            newImage
            })
          }
        />
        <Button
          color='red'
          icon='close'
          content='Close'
          onClick={toggleModal}
        />
      </Modal.Actions>
    </Modal>
  )
}
