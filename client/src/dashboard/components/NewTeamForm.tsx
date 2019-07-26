import React, { useState, useRef } from 'react'
import { UpdateTeam } from '../types'
import { countries } from '../../enum'
import {
  Form,
  Grid,
  Checkbox,
  Image,
  Button
} from 'semantic-ui-react'

interface Props {
  onSubmit: (newPlayer: UpdateTeam) => Promise<void>,
  loading: boolean,
  error: boolean
}

interface State {
  shortName: string,
  longName: string,
  country: string,
  hasLogo: boolean,
  logo: null | File
}

const getDefaultState = (): State => ({
  shortName: '',
  longName: '',
  country: '',
  hasLogo: false,
  logo: null
})

export default ({
  onSubmit,
  loading,
  error
}: Props) => {
  const [state, setState] = useState<State>(getDefaultState)
  const inputRef = useRef<null | HTMLInputElement>(null)

  const _handleSubmit = () => onSubmit({
    nameShort: state.shortName,
    nameLong: state.longName,
    country: state.country,
    hasLogo: state.hasLogo,
    logo: state.logo
  })
    .then(() => setState(getDefaultState))

  return (
    <Form onSubmit={_handleSubmit} loading={loading} error={error}>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={state.hasLogo ? 11 : 16}>
            <Form.Group widths='equal'>
              <Form.Input
                name='teamShortName'
                value={state.shortName}
                error={error}
                onChange={e => setState({
                  ...state,
                  shortName: e.currentTarget.value
                })}
                fluid label='Team name (Short)'
                placeholder='Team name (Short)'
                required
              />
              <Form.Input
                name='teamLongName'
                value={state.longName}
                onChange={e => setState({
                  ...state,
                  longName: e.currentTarget.value
                })}
                fluid label='Team name (Long)'
                placeholder='Team name (Long)'
                required
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
                  country: value !== undefined ? value.toString() : ''
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
                  hasLogo: checked !== undefined ? checked : false,
                  logo: checked ? state.logo : null
                })}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className={`image-container ${!state.hasLogo ? 'do-not-show' : ''}`}>
              <Image
                src={!state.logo
                  ? '/static/default/default-team.png'
                  : window.URL.createObjectURL(state.logo)
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
            <div className={!state.hasLogo ? 'do-not-show' : 'button-layout'}>
              <input
                onChange={e => setState({
                  ...state,
                  logo: e.target.files ? e.target.files[0] : null
                })}
                className='inputfile'
                type='file'
                name='file'
                ref={inputRef}
                accept='image/svg+xml, image/jpeg, image/png'
              />
              <Button
                inverted
                type='button'
                color='red'
                onClick={() => {
                  setState({
                    ...state,
                    logo: null
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
