import React, {
  useState,
  useRef,
  useCallback,
  useEffect
} from 'react'

import {
  Player,
  Team,
  Country,
  NewTeam,
  ListElement,
  NewPlayer
} from '../types'

import {
  Modal,
  Button,
  Image,
  Header,
  Flag,
  Form,
  Checkbox
} from 'semantic-ui-react'

interface TeamSelectionProps {
  isOpen: boolean,
  toggleModal: () => void,
  onSelected: (id: string) => () => void,
  teams: Team[]
}

export const TeamSelectionModal = ({
  isOpen,
  toggleModal,
  teams,
  onSelected
}: TeamSelectionProps) => (
  <Modal open={isOpen} onClose={toggleModal} centered={false} basic size='large'>
    <Header className='selection-header' icon='users' content='Select Team' />
    <div className='team-selection-modal'>
      {teams.map(team => (
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

interface ConfirmModalProps {
  isOpen: boolean,
  toggleModal: () => void,
  onDelete: () => void,
  modalHeader: string,
  modalBody: string,
  affectedTargets?: Player[]
}

export const ConfirmModal = ({
  isOpen,
  toggleModal,
  onDelete,
  modalBody,
  modalHeader,
  affectedTargets
}: ConfirmModalProps) => (
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

interface ViewModalProps {
  isOpen: boolean,
  toggleModal: () => void,
  currentView: Player | undefined,
  players: Player[],
  currentTeam?: Team | null
}

export const ViewPlayerModal = ({
  isOpen,
  toggleModal,
  currentView,
  currentTeam,
  players
}: ViewModalProps) => {
  if (currentView === undefined
    || currentTeam === null
    || currentTeam === undefined
  ) {
    return <Modal open={isOpen} onClose={toggleModal} />
  }

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
            ))
          }
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

interface ViewTeamModalProps {
  isOpen: boolean,
  toggleModal: () => void,
  currentTeam: Team,
  currentPlayers: Player[]
}

export const ViewTeamModal = (props: ViewTeamModalProps) => {
  const { isOpen, toggleModal, currentTeam, currentPlayers } = props

  if (currentTeam === undefined || currentTeam === null) {
    return <Modal open={isOpen} onClose={toggleModal} />
  }

  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <Modal.Header>Team details</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size='medium'
          src={`/${currentTeam.logoPath === null
            ? 'static/default/default-team.png'
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

interface EditTeamModalProps {
  isOpen: boolean,
  toggleModal: () => void,
  onEditDone: (newTeam: NewTeam) => () => void,
  currentTeam: Team,
  currentPlayers: Player[],
  countries: Country[]
}

interface EditModalState {
  nameShort: string,
  nameLong: string,
  country: string,
  hasLogo: boolean,
  logoPath: string,
  hasChangedLogo: boolean,
  newLogo: null | File
}

export const EditTeamModal = ({
  isOpen,
  toggleModal,
  currentTeam,
  countries,
  onEditDone
}: EditTeamModalProps) => {
  if (currentTeam === undefined || currentTeam === null) {
    return <Modal open={isOpen} onClose={toggleModal} />
  }

  const [ state, setState ] = useState<EditModalState>({
    nameShort: currentTeam.teamNameShort,
    nameLong: currentTeam.teamNameLong,
    country: currentTeam.country,
    hasLogo: currentTeam.hasLogo,
    logoPath: currentTeam.logoPath,
    hasChangedLogo: false,
    newLogo: null
  })

  const fileInputRef = useRef<null|HTMLInputElement>(null)

  const resetValues = useCallback(() => {
    setState({
      ...state,
      nameShort: currentTeam.teamNameShort,
      nameLong: currentTeam.teamNameLong,
      country: currentTeam.country,
      hasLogo: currentTeam.hasLogo,
      logoPath: currentTeam.logoPath,
      hasChangedLogo: false,
      newLogo: null
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  useEffect(() => {
    if (!state.hasLogo && state.hasChangedLogo) {
      setState({
        ...state,
        hasChangedLogo: false,
        newLogo: null
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [state.hasLogo, state.hasChangedLogo])
  console.log(state)

  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <Modal.Header>Edit team</Modal.Header>
      <Modal.Content image={state.hasLogo}>
        {state.hasLogo
          ? <Image
            wrapped
            size='medium'
            src={`/${state.hasChangedLogo
              ? window.URL.createObjectURL(state.newLogo)
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
                value={state.nameShort}
                onChange={e => setState({
                  ...state,
                  nameShort: e.target.value
                })}
              />
              <Form.Input
                fluid
                label='Team name (Long)'
                placeholder='Team name (Long)'
                value={state.nameLong}
                onChange={e => setState({
                  ...state,
                  nameLong: e.target.value
                })}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
                label='Country'
                name='teamCountry'
                options={countries}
                value={state.country}
                onChange={(e, { value }) => setState({
                  ...state,
                  country: value ? value.toString() : ''
                })}
                placeholder='Country'
              />
            </Form.Group>
            <Form.Field>
              <Checkbox
                label='Team has Image'
                name='teamHasLogo'
                checked={state.hasLogo}
                onChange={(e, { checked }) => setState({
                  ...state,
                  hasLogo: checked !== undefined ? checked : false
                })}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <div className={`dropbox-container ${!state.hasLogo ? 'invis' : ''}`}>
          <input
            onChange={e => {
              setState({
                ...state,
                newLogo: e.target.files ? e.target.files[0] : null,
                hasChangedLogo: true
              })
            }}
            className='inputfile-modal'
            ref={fileInputRef}
            type='file'
            name='file'
            accept='image/svg+xml, image/jpeg, image/png'
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
            nameShort: state.nameShort,
            nameLong: state.nameLong,
            country: state.country,
            hasLogo: state.hasLogo,
            logoPath: state.logoPath,
            hasChangedLogo: state.hasChangedLogo,
            newLogo: state.newLogo
          })}
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

interface EditPlayerModalProps {
  isOpen: boolean,
  toggleModal: () => void,
  onEditDone: (newPlayer: NewPlayer) => () => void,
  currentPlayer: Player | undefined,
  currentTeam?: Team | null,
  teams: ListElement[],
  countries: Country[]
}

interface EditPlayerState {
  firstName: string,
  lastName: string,
  gameName: string,
  team: string,
  country: string,
  steam64id: string,
  hasImage: boolean,
  imagePath: string,
  hasNewImage: boolean,
  newImage: null | File
}

export const EditPlayerModal = ({
  isOpen,
  toggleModal,
  currentPlayer,
  currentTeam,
  countries,
  onEditDone,
  teams
}: EditPlayerModalProps) => {
  if (!currentPlayer || !currentTeam) {
    return <Modal open={isOpen} onClose={toggleModal} />
  }

  const [ state, setState ] = useState<EditPlayerState>({
    firstName: currentPlayer.firstName,
    lastName: currentPlayer.lastName,
    gameName: currentPlayer.gameName,
    team: currentPlayer.team,
    country: currentPlayer.country,
    steam64id: currentPlayer.steam64id,
    hasImage: currentPlayer.hasImage,
    imagePath: currentPlayer.imagePath,
    hasNewImage: false,
    newImage: null
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const resetValues = useCallback(() => {
    setState({
      ...state,
      firstName: currentPlayer.firstName,
      lastName: currentPlayer.lastName,
      gameName: currentPlayer.gameName,
      team: currentPlayer.team,
      country: currentPlayer.country,
      steam64id: currentPlayer.steam64id,
      hasImage: currentPlayer.hasImage,
      imagePath: currentPlayer.imagePath,
      hasNewImage: false,
      newImage: null
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  useEffect(() => {
    if (!state.hasImage && state.hasNewImage) {
      setState({
        ...state,
        hasNewImage: false,
        newImage: null
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [state.hasImage, state.hasNewImage])

  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <Modal.Header>Edit player</Modal.Header>
      <Modal.Content image={state.hasImage}>
        {state.hasImage
          ? <Image
            wrapped
            size='medium'
            src={`/${state.hasNewImage
              ? window.URL.createObjectURL(state.newImage)
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
                value={state.firstName}
                onChange={e => setState({
                  ...state,
                  firstName: e.target.value
                })}
              />
              <Form.Input
                fluid
                label='Last name'
                placeholder='Last name'
                value={state.lastName}
                onChange={e => setState({
                  ...state,
                  lastName: e.target.value
                })}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Game name'
                placeholder='Game name'
                value={state.gameName}
                onChange={e => setState({
                  ...state,
                  gameName: e.target.value
                })}
              />
              <Form.Input
                fluid
                label='Steam64ID'
                placeholder='Steam64ID'
                value={state.steam64id}
                onChange={e => setState({
                  ...state,
                  steam64id: e.target.value
                })}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
                label='Team'
                options={teams}
                value={state.team}
                onChange={(e, { value }) => setState({
                  ...state,
                  team: value ? value.toString() : ''
                })}
                placeholder='Country'
              />
              <Form.Select
                label='Country'
                options={countries}
                value={state.country}
                onChange={(e, { value }) => setState({
                  ...state,
                  country: value ? value.toString() : ''
                })}
                placeholder='Country'
              />
            </Form.Group>
            <Form.Field>
              <Checkbox
                label='Player has Image'
                checked={state.hasImage}
                onChange={(e, { checked }) => setState({
                  ...state,
                  hasImage: checked !== undefined ? checked : false
                })}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <div className={`dropbox-container ${!state.hasImage ? 'invis' : ''}`}>
          <input
            onChange={e => {
              setState({
                ...state,
                newImage: e.target.files ? e.target.files[0] : null,
                hasNewImage: true
              })
            }}
            className='inputfile-modal'
            ref={fileInputRef}
            type='file'
            name='file'
            accept='image/svg+xml, image/jpeg, image/png'
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
            firstName: state.firstName,
            lastName: state.lastName,
            gameName: state.gameName,
            team: state.team,
            country: state.country,
            steam64Id: state.steam64id,
            hasImage: state.hasImage,
            imagePath: state.imagePath,
            hasNewImage: state.hasNewImage,
            newImage: state.newImage
          })}
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
