// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { State } from '../../types'
import type { Dispatch, Teams, Match, Player } from '../types'

import {
  toggleTeamSelectionModal,
  setSelectedId,
  setMatches,
  setSelectedItem,
  toggleConfirmModal,
  deleteMatch,
  toggleLiveConfirmModal
} from '../actions'

import { getMatches, setMatch, removeMatch, setMatchToLive, forceLoadMatches } from '../client'
import { TeamSelectionModal, ConfirmModal } from '../components'

import {
  Breadcrumb,
  Icon,
  Grid,
  Header,
  Image,
  Button,
  Table,
  Popup,
  Message,
  List
} from 'semantic-ui-react'

type Props = {
  dispatch: Dispatch,
  teamSelectionModalOpen: boolean,
  teams: Teams,
  selectedId: string,
  maps: Array<string>,
  matches: Array<Match>,
  confirmModalOpen: boolean,
  selectedItem: number,
  confirmLiveModalOpen: boolean,
  players: Array<Player>
}

type ComponentState = {
  a: null | string,
  b: null | string
}

type PossibleTeam = any

class LivePage extends Component<Props, ComponentState> {
  state = {
    a: null,
    b: null
  }

  _toggleChooseModal = () => {
    const { dispatch, teamSelectionModalOpen } = this.props
    const toggle = toggleTeamSelectionModal(!teamSelectionModalOpen)
    dispatch(toggle)
  }

  _openChooseModal = (id: string) => () => {
    this.props.dispatch(setSelectedId(id))
    this._toggleChooseModal()
  }

  _resetFields = () => {
    return new Promise(resolve => {
      resolve(this.setState({
        a: null,
        b: null
      }))
    })
  }

  _toggleConfirmModal = () => {
    const { dispatch, confirmModalOpen } = this.props
    const toggle = toggleConfirmModal(!confirmModalOpen)
    dispatch(toggle)
  }

  _openConfirmModal = (index: number) => () => {
    this.props.dispatch(setSelectedItem(index))
    this._toggleConfirmModal()
  }

  _toggleLiveConfirmModal = () => {
    const { dispatch, confirmLiveModalOpen } = this.props
    const toggle = toggleLiveConfirmModal(!confirmLiveModalOpen)
    dispatch(toggle)
  }

  _openLiveConfirmModal = (index: number) => () => {
    this.props.dispatch(setSelectedItem(index))
    this._toggleLiveConfirmModal()
  }

  _forceLoad = () => forceLoadMatches()

  _openCurrentLiveConfirmModal = (match: Match) => () => {
    if (match !== undefined) {
      const index = this.props.matches.findIndex((currMatch: Match) => currMatch._id === match._id)
      this.props.dispatch(setSelectedItem(index))
      this._toggleLiveConfirmModal()
    }
  }

  _deleteMatch = () => {
    const { dispatch, selectedItem, matches } = this.props
    if (
      selectedItem !== null &&
      selectedItem !== undefined &&
      matches[selectedItem]._id !== undefined
    ) {
      removeMatch(matches[selectedItem]._id)
        .then(dispatch(deleteMatch()))
        .then(this._toggleConfirmModal)
        .catch(e => console.log(e))
    }
  }

  _addNewMatch = () => {
    const { a, b } = this.state
    const { dispatch, matches } = this.props
    const newMatch = { teamA: a, teamB: b }

    setMatch(newMatch)
      .then(match => dispatch(setMatches([...matches, match])))
      .catch(e => console.log(e))
      .then(this._resetFields)
  }

  _getMatches = () => getMatches()
    .then(matches => setMatches(matches))
    .then(this.props.dispatch)

  _setMatchToLive = () => {
    const { selectedItem, matches } = this.props
    if (
      selectedItem !== null &&
      selectedItem !== undefined &&
      matches[selectedItem]._id !== undefined
    ) {
      setMatchToLive(matches[selectedItem]._id)
        .then(this._getMatches)
        .then(this._toggleLiveConfirmModal)
        .catch(e => console.log(e))
    }
  }

  _onSelectedTeam = (id: string) => () => {
    return Promise.resolve(this.setState({ [this.props.selectedId]: id }))
      .then(this._toggleChooseModal)
      .then(this.props.dispatch(setSelectedId(null)))
  }

  render () {
    const {
      teamSelectionModalOpen,
      teams,
      matches,
      confirmModalOpen,
      confirmLiveModalOpen,
      players
    } = this.props

    const { a, b } = this.state

    const teamA: PossibleTeam = a !== null
      ? teams.find(team => team._id === a) !== undefined
        ? teams.find(team => team._id === a)
        : null
      : null

    const teamB: PossibleTeam = b !== null
      ? teams.find(team => team._id === b) !== undefined
        ? teams.find(team => team._id === b)
        : null
      : null

    const isMatchLive = matches.find((val, index) => val.isLive === true)
    const currentTeamA: any = isMatchLive ? teams.find((team, index) => isMatchLive.teamA === team._id) : null
    const currentTeamB: any = isMatchLive ? teams.find((team, index) => isMatchLive.teamB === team._id) : null

    return (
      <React.Fragment>
        <div className='f-container-header'>
          <Breadcrumb size='massive' >
            <Breadcrumb.Section>Game</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>
              <Icon name='fire' />Live
            </Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div className='f-container'>
          <div className='f-container-inner'>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={11}>
                  <div className='f-container-wrap'>
                    <Header as='h2'>
                      <Icon name='fire' />
                      <Header.Content>Live match</Header.Content>
                    </Header>
                    {isMatchLive === undefined ? (
                      <Message
                        info
                        header='There is match currently live'
                        content='You can start match from "Current matches ready" tab.' />
                    ) : (
                      <React.Fragment>
                        <div className='current-game'>
                          <div className='team-a'>
                            <div>
                              <Image
                                src={`/${currentTeamA.logoPath === null ? 'static/default/default-team.png' : currentTeamA.logoPath}`}
                                wrapped
                                size='small'
                                centered
                              />
                              <h2>{currentTeamA.teamNameShort}</h2>
                              <List selection verticalAlign='middle'>
                                {players.filter(player => player.team === currentTeamA.teamNameShort)
                                  .map((player, index) => (
                                    <List.Item key={player._id}>
                                      <Image avatar src={`/${player.imagePath === null ? 'static/default/default-player.png' : player.imagePath}`} />
                                      <List.Content>
                                        <List.Header>{player.firstName} '{player.gameName}' {player.lastName}</List.Header>
                                      </List.Content>
                                    </List.Item>
                                  ))
                                }
                              </List>
                            </div>
                          </div>
                          <div className='vs'>
                            <div>
                              <span>VS</span>
                            </div>
                          </div>
                          <div className='team-b'>
                            <div>
                              <Image
                                src={`/${currentTeamB.logoPath === null ? 'static/default/default-team.png' : currentTeamB.logoPath}`}
                                wrapped
                                size='small'
                                centered
                              />
                              <h2>{currentTeamB.teamNameShort}</h2>
                              <List selection verticalAlign='middle'>
                                {players.filter(player => player.team === currentTeamB.teamNameShort)
                                  .map((player, index) => (
                                    <List.Item key={player._id}>
                                      <Image avatar src={`/${player.imagePath === null
                                        ? 'static/default/default-player.png'
                                        : player.imagePath}`}
                                      />
                                      <List.Content>
                                        <List.Header>{player.firstName} '{player.gameName}' {player.lastName}</List.Header>
                                      </List.Content>
                                    </List.Item>
                                  ))
                                }
                              </List>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </Grid.Column>
                <Grid.Column width={5}>
                  <div className='f-container-wrap'>
                    <Header as='h2'>
                      <Icon name='fire' />
                      <Header.Content>Live match actions</Header.Content>
                    </Header>
                    {isMatchLive !== undefined
                      ? <div className='actions-container'>
                        <Button
                          fluid
                          color='google plus'
                          onClick={this._forceLoad}
                        >Force load</Button>
                        <Button
                          fluid
                          color='instagram'
                          onClick={this._openCurrentLiveConfirmModal(isMatchLive)}
                        >Unload match</Button>
                      </div> : null
                    }
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <div className='f-container-wrap'>
                    <Header as='h2'>
                      <Icon name='time' />
                      <Header.Content>Current matches ready</Header.Content>
                    </Header>
                    {matches.length <= 0
                      ? <Message info header='There is no matches' content='Add more matches down below' />
                      : <Table basic='very' celled>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Team A</Table.HeaderCell>
                            <Table.HeaderCell>Team B</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {matches.map((match, index) => {
                            const teamA: PossibleTeam = teams.find(team => team._id === match.teamA)
                            const teamB: PossibleTeam = teams.find(team => team._id === match.teamB)
                            return (
                              <Table.Row key={match._id}>
                                <Table.Cell>
                                  {teamA
                                    ? <Header as='h4' image>
                                      <Image
                                        src={`/${teamA.logoPath === null ? 'static/default/default-team.png' : teamA.logoPath}`}
                                        rounded
                                        size='mini'
                                      />
                                      <Header.Content>
                                        {teamA.teamNameShort}
                                        <Header.Subheader>{teamA.teamNameLong}</Header.Subheader>
                                      </Header.Content>
                                    </Header> : null
                                  }
                                </Table.Cell>
                                <Table.Cell>
                                  {teamB
                                    ? <Header as='h4' image>
                                      <Image
                                        src={`/${teamB.logoPath === null ? 'static/default/default-team.png' : teamB.logoPath}`}
                                        rounded
                                        size='mini'
                                      />
                                      <Header.Content>
                                        {teamB.teamNameShort}
                                        <Header.Subheader>{teamB.teamNameLong}</Header.Subheader>
                                      </Header.Content>
                                    </Header> : null
                                  }
                                </Table.Cell>
                                <Table.Cell>
                                  <Popup
                                    inverted
                                    trigger={<Button
                                      color={match.isLive ? 'red' : 'orange'}
                                      icon={match.isLive ? 'pause circle' : 'play circle'}
                                      onClick={this._openLiveConfirmModal(index)}
                                    />}
                                    content={match.isLive ? 'End match' : 'Start match'}
                                  />
                                  <Popup
                                    inverted
                                    trigger={<Button
                                      primary
                                      icon='eye'
                                      disabled
                                      onClick={() => null}
                                    />}
                                    content='Show match'
                                  />
                                  <Popup
                                    inverted
                                    trigger={<Button
                                      positive
                                      icon='edit'
                                      disabled
                                      onClick={() => null}
                                    />}
                                    content='Edit match'
                                  />
                                  <Popup
                                    inverted
                                    trigger={<Button
                                      negative
                                      icon='delete'
                                      onClick={this._openConfirmModal(index)}
                                    />}
                                    content='Delete match'
                                  />
                                </Table.Cell>
                              </Table.Row>
                            )
                          })}
                        </Table.Body>
                      </Table>
                    }
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <div className='f-container-wrap'>
                    <Header as='h2'>
                      <Icon name='gamepad' />
                      <Header.Content>Add new match</Header.Content>
                    </Header>
                    <div className='new-match'>
                      <div className='team-a'>
                        <div className='select-team' onClick={this._openChooseModal('a')}>
                          {teamA === null ? (
                            <Header as='h2' icon>
                              <Icon name='group' />
                              Select team
                            </Header>
                          ) : (
                            <div className='chosen'>
                              <Image
                                src={`/${teamA.logoPath === null ? 'static/default/default-team.png' : teamA.logoPath}`}
                                wrapped
                                size='small'
                                centered
                              />
                              <h2>{teamA.teamNameShort}</h2>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='vs'>
                        <div className='margin-bottom-default'>
                          <span>VS</span>
                        </div>
                        <div className='margin-top-default'>
                          <Button
                            positive
                            disabled={(a === null || b === null)}
                            onClick={this._addNewMatch}
                          >Save match</Button>
                        </div>
                      </div>
                      <div className='team-b'>
                        <div className='select-team' onClick={this._openChooseModal('b')}>
                          {teamB === null
                            ? <Header as='h2' icon>
                              <Icon name='group' />
                              Select team
                            </Header> : <div className='chosen'>
                              <Image
                                src={`/${teamB.logoPath === null ? 'static/default/default-team.png' : teamB.logoPath}`}
                                wrapped
                                size='small'
                                centered
                              />
                              <h2>{teamB.teamNameShort}</h2>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {teamSelectionModalOpen
              ? <TeamSelectionModal
                isOpen={teamSelectionModalOpen}
                toggleModal={this._toggleChooseModal}
                onSelected={this._onSelectedTeam}
                teams={teams}
              /> : null
            }
            {confirmModalOpen
              ? <ConfirmModal
                modalHeader='Delete match'
                modalBody='Are you sure you want to delete this match'
                isOpen={confirmModalOpen}
                toggleModal={this._toggleConfirmModal}
                onDelete={this._deleteMatch}
              /> : null
            }
            {confirmLiveModalOpen
              ? <ConfirmModal
                modalHeader='Set match to (un)live'
                modalBody='Are you sure you want to set this match to (un)live.'
                isOpen={confirmLiveModalOpen}
                toggleModal={this._toggleLiveConfirmModal}
                onDelete={this._setMatchToLive}
              /> : null
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: State) => ({
  teamSelectionModalOpen: state.dashboard.modals.teamSelectionModalOpen,
  teams: state.dashboard.teams,
  confirmModalOpen: state.dashboard.modals.confirmModalOpen,
  players: state.dashboard.players,
  confirmLiveModalOpen: state.dashboard.modals.confirmLiveModalOpen,
  selectedId: state.dashboard.selectedId,
  selectedItem: state.dashboard.selectedItem,
  maps: state.dashboard.maps,
  matches: state.dashboard.matches
})

export default connect(mapStateToProps)(LivePage)
