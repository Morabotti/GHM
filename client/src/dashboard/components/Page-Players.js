// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Icon, Breadcrumb, Header, Form } from 'semantic-ui-react'

import type { Dispatch, Country, Players, Teams, ListElement } from '../types'
import type { State } from '../../types'

type Props = {
  dispatch: Dispatch,
  countries: Array<Country>,
  teams: Teams,
  players: Players
}

type ComponentState = {
  teamsArray: Array<ListElement>
}

class PlayersPage extends Component<Props, ComponentState> {
  state = {
    teamsArray: []
  }

  componentDidUpdate(prevProp: Props) {
    if(this.props.teams.length > 0 && prevProp.teams.length === 0) {
      let newArray = []

      this.props.teams.forEach(team => {
        newArray = [
          ...newArray,
          {
            key: team.teamNameShort,
            value: team.teamNameShort,
            text: team.teamNameLong,
            image: { avatar: true, src: `/${team.logoPath}` }
          }
        ]
      });

      this.setState({
        teamsArray: newArray
      })
    }
  }

  render () {
    const { countries, teams } = this.props
    const { teamsArray } = this.state

    return (
      <React.Fragment>
        <div className='f-container-header'>
          <Breadcrumb size='massive' >
            <Breadcrumb.Section>Team Management</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>
              <Icon name='user' />Players
            </Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div className='f-container'>
          <div className='f-container-inner'>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column>
                  <div className='f-container-wrap'>
                  <Header as='h2'>
                    <Icon name='user plus' />
                    <Header.Content>Add player</Header.Content>
                  </Header>
                    <Form>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='First name' placeholder='First name' required />
                        <Form.Input fluid label='Last name' placeholder='Last name' required />
                        <Form.Input fluid label='Gamer name' placeholder='Gamer name' required />
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Select label='Team' options={teamsArray} placeholder='Team' required />
                        <Form.Select label='Country' options={countries} placeholder='Country' />
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='SteamID64' placeholder='SteamID64' required />
                      </Form.Group>
                      
                      <Form.Button primary>Submit</Form.Button>
                    </Form>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: State) => ({
  countries: state.dashboard.countries,
  teams: state.dashboard.teams,
  players: state.dashboard.players
})

export default connect(mapStateToProps)(PlayersPage)
