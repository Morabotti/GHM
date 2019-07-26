import React, { useState, useRef } from 'react'
import { ListElement, UpdatePlayer } from '../types'
import { countries } from '../../enum'
import {
  Form,
  Grid,
  Checkbox,
  Image,
  Button
} from 'semantic-ui-react'

interface Props {
  onSubmit: (newPlayer: UpdatePlayer) => Promise<void>,
  loading: boolean,
  error: boolean,
  teams: null | ListElement[]
}

interface State {
  firstName: string,
  lastName: string,
  gameName: string,
  country: string,
  team: string,
  steam64ID: string,
  hasImg: boolean,
  img: File | null
}

const getDefaultState = (): State => ({
  firstName: '',
  lastName: '',
  gameName: '',
  country: '',
  team: '',
  steam64ID: '',
  hasImg: false,
  img: null
})

export default ({
  onSubmit,
  loading,
  error,
  teams
}: Props) => {
  const [ state, setState ] = useState<State>(getDefaultState)
  const inputRef = useRef<null | HTMLInputElement>(null)

  const _handleSubmit = () => onSubmit({
    firstName: state.firstName,
    lastName: state.lastName,
    gameName: state.gameName,
    country: state.country,
    team: state.team,
    steam64ID: state.steam64ID,
    hasImage: state.hasImg,
    image: state.img
  })
    .then(() => setState(getDefaultState))

  return (
    <Form loading={loading} error={error} onSubmit={_handleSubmit}>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={state.hasImg ? 11 : 16}>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                value={state.firstName}
                onChange={e => setState({
                  ...state,
                  firstName: e.currentTarget.value
                })}
                label='First name'
                placeholder='First name'
                required
              />
              <Form.Input
                fluid
                value={state.lastName}
                onChange={e => setState({
                  ...state,
                  lastName: e.currentTarget.value
                })}
                label='Last name'
                placeholder='Last name'
                required
              />
              <Form.Input
                fluid
                value={state.gameName}
                onChange={e => setState({
                  ...state,
                  gameName: e.currentTarget.value
                })}
                label='Gamer name'
                placeholder='Gamer name'
                required
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
                label='Team'
                options={teams || []}
                onChange={(e, { value }) => setState({
                  ...state,
                  team: value !== undefined ? value.toString() : ''
                })}
                value={state.team}
                placeholder='Team'
                required
              />
              <Form.Select
                label='Country'
                options={countries}
                onChange={(e, { value }) => setState({
                  ...state,
                  country: value !== undefined ? value.toString() : 'fi'
                })}
                value={state.country}
                placeholder='Country'
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                name='playerSteam64ID'
                value={state.steam64ID}
                onChange={e => setState({
                  ...state,
                  steam64ID: e.currentTarget.value
                })}
                error={error}
                fluid
                label='SteamID64'
                placeholder='SteamID64'
                required
              />
            </Form.Group>
            <Form.Field>
              <Checkbox
                label='User has Image'
                name='playerHasImg'
                checked={state.hasImg}
                onChange={(e, { checked }) => setState({
                  ...state,
                  hasImg: checked !== undefined ? checked : false,
                  img: checked ? state.img : null
                })}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className={`image-container ${!state.hasImg ? 'do-not-show' : ''}`}>
              <Image
                src={!state.img
                  ? '/static/default/default-player.png'
                  : window.URL.createObjectURL(state.img)
                }
                size='small'
                centered
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className='actions-reverse-mobile'>
          <Grid.Column floated='left' width={11}>
            <Form.Button type='submit' primary>Save</Form.Button>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <div className={!state.hasImg ? 'do-not-show' : 'button-layout'}>
              <input
                onChange={e => setState({
                  ...state,
                  img: e.target.files ? e.target.files[0] : null
                })}
                className='inputfile'
                type='file'
                name='file'
                ref={inputRef}
                accept='image/jpeg, image/png'
              />
              <Button
                inverted
                type='button'
                color='red'
                onClick={() => {
                  setState({
                    ...state,
                    img: null
                  })
                }}
              >
                Reset
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}
