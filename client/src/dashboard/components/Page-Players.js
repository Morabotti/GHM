// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Icon,
  Breadcrumb,
  Header,
  Form,
  Table,
  Image,
  Flag,
  Button,
  Popup
} from 'semantic-ui-react'

import type {
  Dispatch,
  Country,
  Players,
  Teams,
  ListElement,
  Team
} from '../types'

import type { State } from '../../types'

type Props = {
  dispatch: Dispatch,
  countries: Array<Country>,
  players: Players,
  teams: Array<Team>,
  teamsDropdown: Array<ListElement>
}

class PlayersPage extends Component<Props> {
  render () {
    const { countries, teamsDropdown, players, teams } = this.props

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
                        <Form.Select label='Team' options={teamsDropdown} placeholder='Team' required />
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
              <Grid.Row>
                <Grid.Column>
                  <div className='f-container-wrap'>
                    <Header as='h2'>
                      <Icon name='users' />
                      <Header.Content>Handle players</Header.Content>
                    </Header>
                    <Table basic='very' celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Players</Table.HeaderCell>
                          <Table.HeaderCell>Team</Table.HeaderCell>
                          <Table.HeaderCell>Country</Table.HeaderCell>
                          <Table.HeaderCell>STEAM64ID</Table.HeaderCell>
                          <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {players.map((player, index) => {
                          const team: any = teams.find(val => val.teamNameShort === player.team)
                          return (
                            <Table.Row key={player._id}>
                              <Table.Cell>
                                <Header as='h4' image>
                                  <Image src={`/${player.imagePath}`} rounded size='mini' />
                                  <Header.Content>
                                    {player.gameName}
                                    <Header.Subheader>{player.firstName} {player.lastName}</Header.Subheader>
                                  </Header.Content>
                                </Header>
                              </Table.Cell>
                              <Table.Cell>
                                <Image src={`/${team.logoPath}`} avatar />
                                <span>{player.team}</span>
                              </Table.Cell>
                              <Table.Cell>
                                <Flag name={player.country} />
                                <span>{player.country}</span>
                              </Table.Cell>
                              <Table.Cell>
                                {player.steam64id}
                              </Table.Cell>
                              <Table.Cell>
                                <Popup
                                  inverted
                                  trigger={<Button
                                    primary
                                    icon='eye'
                                    onClick={null}
                                  />}
                                  content='Show player'
                                />
                                <Popup
                                  inverted
                                  trigger={<Button
                                    positive
                                    icon='edit'
                                    onClick={null}
                                  />}
                                  content='Edit player'
                                />
                                <Popup
                                  inverted
                                  trigger={<Button
                                    negative
                                    icon='delete'
                                    onClick={null}
                                  />}
                                  content='Delete player'
                                />
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
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
  players: state.dashboard.players,
  teams: state.dashboard.teams,
  teamsDropdown: state.dashboard.teamsDropdown
})

export default connect(mapStateToProps)(PlayersPage)
