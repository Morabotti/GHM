import React, {
  useState,
  useRef,
  useCallback,
  useEffect
} from 'react'

import { countries } from '../../enum'

import {
  Modal,
  Button,
  Image,
  Header,
  Flag,
  Form,
  Checkbox,
  Loader
} from 'semantic-ui-react'

import {
  PlayerSpecific,
  ListElement,
  NewPlayer
} from '../types'

interface ViewModalProps {
  isOpen: boolean,
  onClose: () => void,
  player: PlayerSpecific | null
}

export const ViewPlayerModal = ({
  isOpen,
  onClose,
  player
}: ViewModalProps) => {
  if (player === null) {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Loader size='massive'>Loading</Loader>
      </Modal>
    )
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Player details</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size='medium'
          src={`/${player.imagePath === null
            ? 'static/default/default-player.png'
            : player.imagePath}`}
        />
        <Modal.Description>
          <Header>{player.firstName} '{player.gameName}' {player.lastName}</Header>
          <p>
            <Flag name={player.country} />
            <span>{player.country.toUpperCase()}</span>
          </p>
          <p>
            <Image
              src={`/${player.team.logoPath === null ? 'static/default/default-team.png' : player.team.logoPath}`}
              avatar
            />
            <span>{player.team.nameLong}</span>
          </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

interface EditPlayerModalProps {
  isOpen: boolean,
  onClose: () => void,
  onEdit: (newPlayer: NewPlayer) => () => void,
  player: PlayerSpecific | null,
  teams: ListElement[] | null
}

interface EditPlayerState {
  firstName: string,
  lastName: string,
  gameName: string,
  team: string,
  country: string,
  steam64ID: string,
  hasImage: boolean,
  imagePath: string,
  hasNewImage: boolean,
  newImage: null | File
}

export const EditPlayerModal = ({
  isOpen,
  onClose,
  onEdit,
  player,
  teams
}: EditPlayerModalProps) => {
  if (player === null) {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Loader size='massive'>Loading</Loader>
      </Modal>
    )
  }

  const [ state, setState ] = useState<EditPlayerState>({
    firstName: player.firstName,
    lastName: player.lastName,
    gameName: player.gameName,
    team: player.team.nameShort,
    country: player.country,
    steam64ID: player.steam64ID,
    hasImage: player.hasImage,
    imagePath: player.imagePath,
    hasNewImage: false,
    newImage: null
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const resetValues = useCallback(() => {
    setState({
      ...state,
      firstName: player.firstName,
      lastName: player.lastName,
      gameName: player.gameName,
      team: player.team.nameShort,
      country: player.country,
      steam64ID: player.steam64ID,
      hasImage: player.hasImage,
      imagePath: player.imagePath,
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
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Edit player</Modal.Header>
      <Modal.Content image={state.hasImage}>
        {state.hasImage
          ? <Image
            wrapped
            size='medium'
            src={state.hasNewImage && state.newImage !== null
              ? window.URL.createObjectURL(state.newImage)
              : player.imagePath === null
                ? '/static/default/default-player.png'
                : `/${player.imagePath}`}
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
                value={state.steam64ID}
                onChange={e => setState({
                  ...state,
                  steam64ID: e.target.value
                })}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
                label='Team'
                options={teams !== null ? teams : []}
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
          onClick={onEdit({
            firstName: state.firstName,
            lastName: state.lastName,
            gameName: state.gameName,
            team: state.team,
            country: state.country,
            steam64ID: state.steam64ID,
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
          onClick={onClose}
        />
      </Modal.Actions>
    </Modal>
  )
}
