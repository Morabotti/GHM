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
  TeamSpecific,
  NewTeam
} from '../types'

interface ViewTeamModalProps {
  isOpen: boolean,
  onClose: () => void,
  team: TeamSpecific | null
}

export const ViewTeamModal = ({
  isOpen,
  onClose,
  team
}: ViewTeamModalProps) => {
  if (team === null) {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Loader size='massive'>Loading</Loader>
      </Modal>
    )
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Team details</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size='medium'
          src={`/${team.logoPath === null
            ? 'static/default/default-team.png'
            : team.logoPath}`}
        />
        <Modal.Description>
          <Header>{team.nameLong} ({team.nameShort})</Header>
          <p>
            <Flag name={team.country} />
            <span>{team.country.toUpperCase()}</span>
          </p>
          <p>Team members: </p>
          {team.players.map(target => (
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
  onClose: () => void,
  onEdit: (newTeam: NewTeam) => () => void,
  team: TeamSpecific | null
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
  onClose,
  team,
  onEdit
}: EditTeamModalProps) => {
  if (team === null) {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Loader size='massive'>Loading</Loader>
      </Modal>
    )
  }

  const [ state, setState ] = useState<EditModalState>({
    nameShort: team.nameShort,
    nameLong: team.nameLong,
    country: team.country,
    hasLogo: team.hasLogo,
    logoPath: team.logoPath,
    hasChangedLogo: false,
    newLogo: null
  })

  const fileInputRef = useRef<null|HTMLInputElement>(null)

  const resetValues = useCallback(() => {
    setState({
      ...state,
      nameShort: team.nameShort,
      nameLong: team.nameLong,
      country: team.country,
      hasLogo: team.hasLogo,
      logoPath: team.logoPath,
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

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Edit team</Modal.Header>
      <Modal.Content image={state.hasLogo}>
        {state.hasLogo
          ? <Image
            wrapped
            size='medium'
            src={state.hasChangedLogo && state.newLogo !== null
              ? window.URL.createObjectURL(state.newLogo)
              : team.logoPath === null
                ? '/static/default/default-team.png'
                : `/${team.logoPath}`}
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
          onClick={onEdit({
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
          onClick={onClose}
        />
      </Modal.Actions>
    </Modal>
  )
}
