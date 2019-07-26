import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newPlayerForm } from '../lib/FormDataWrap'
import { setPlayers } from '../actions'

import {
  Grid,
  Icon,
  Header,
  Table,
  Dimmer,
  Loader
} from 'semantic-ui-react'

import {
  getPlayer,
  addPlayer,
  removePlayer,
  updatePlayerWithImage,
  updatePlayer
} from '../client'

import {
  Dispatch,
  ListElement,
  PlayerList,
  PlayerSpecific,
  UpdatePlayer,
  NewPlayer,
  UpdatePlayerInfo
} from '../types'

import {
  ConfirmModal,
  ViewPlayerModal,
  EditPlayerModal,
  NewPlayerForm,
  PlayerTableRow,
  Layout
} from '../components'

import { State } from '../../types'

interface Props {
  players: null | PlayerList[],
  teamOptions: null | ListElement[],
  dispatch: Dispatch
}

interface ComponentState {
  stateLoading: boolean,
  stateError: boolean,
  isModalViewOpen: boolean,
  isModalEditOpen: boolean,
  isModalDeleteOpen: boolean,
  selectedPlayer: null | PlayerSpecific
}

const getDefaultState = (): ComponentState => ({
  stateLoading: false,
  stateError: false,
  isModalViewOpen: false,
  isModalEditOpen: false,
  isModalDeleteOpen: false,
  selectedPlayer: null
})

class PlayersPage extends Component<Props, ComponentState> {
  state = getDefaultState()

  _handleSubmit = (newPlayer: UpdatePlayer) => {
    const { dispatch, players } = this.props
    const form = newPlayerForm(newPlayer)

    this.setState({
      stateLoading: true,
      stateError: false
    })

    return addPlayer(form)
      .then(player => {
        dispatch(setPlayers([ ...players, player ]))
        this.setState({
          stateLoading: false,
          stateError: false
        })
      })
      .catch(() => {
        this.setState({
          stateLoading: false,
          stateError: true
        })
      })
  }

  _openConfirmModal = (id: string) => () => Promise.resolve(this.setState({
    isModalDeleteOpen: true
  }))
    .then(() => getPlayer(id))
    .then(player => this.setState({
      selectedPlayer: player
    }))
    .catch(() => this.setState({
      isModalDeleteOpen: false,
      selectedPlayer: null
    }))

  _openViewModal = (id: string) => () => Promise.resolve(this.setState({
    isModalViewOpen: true
  }))
    .then(() => getPlayer(id))
    .then(player => this.setState({
      selectedPlayer: player
    }))
    .catch(() => this.setState({
      isModalViewOpen: false,
      selectedPlayer: null
    }))

  _openEditModal = (id: string) => () => Promise.resolve(this.setState({
    isModalEditOpen: true
  }))
    .then(() => getPlayer(id))
    .then(player => this.setState({
      selectedPlayer: player
    }))
    .catch(() => this.setState({
      isModalEditOpen: true,
      selectedPlayer: null
    }))

  _closeEditModal = () => this.setState({
    isModalEditOpen: false,
    selectedPlayer: null
  })

  _closeViewModal = () => this.setState({
    isModalViewOpen: false,
    selectedPlayer: null
  })

  _closeConfirmModal = () => this.setState({
    isModalDeleteOpen: false,
    selectedPlayer: null
  })

  _deletePlayer = () => {
    const { selectedPlayer } = this.state
    const { dispatch, players } = this.props
    if (selectedPlayer === null) {
      return
    }

    removePlayer(selectedPlayer._id)
      .then(() => {
        if (players) {
          dispatch(
            setPlayers(
              players.filter(player => player._id !== selectedPlayer._id)
            )
          )
        }
        this.setState({
          isModalDeleteOpen: false,
          selectedPlayer: null
        })
      })
      .catch(() => {
        this.setState({
          isModalDeleteOpen: false,
          selectedPlayer: null
        })
      })
  }

  _submitEdit = ({
    firstName, lastName, gameName, team,
    country, steam64ID, hasImage, imagePath,
    hasNewImage, newImage
  }: NewPlayer) => () => {
    const { selectedPlayer } = this.state
    const { dispatch, players } = this.props

    if (selectedPlayer === null) {
      return
    }

    if (hasNewImage) {
      const form = newPlayerForm({
        steam64ID,
        firstName,
        lastName,
        gameName,
        country,
        team,
        hasImage,
        image: newImage
      })

      updatePlayerWithImage(form, selectedPlayer._id)
        .then(player => {
          if (players) {
            dispatch(setPlayers(
              players.map(p => p._id === player._id
                ? player
                : p
              )
            ))
          }
          this.setState({
            isModalEditOpen: false,
            selectedPlayer: null
          })
        })
        .catch(() => {
          this.setState({
            isModalEditOpen: false,
            selectedPlayer: null
          })
        })
    }
    else {
      const data: UpdatePlayerInfo = {
        steam64ID,
        firstName,
        lastName,
        gameName,
        country,
        team,
        hasImage
      }

      updatePlayer(data, selectedPlayer._id)
        .then(player => {
          if (players) {
            dispatch(setPlayers(
              players.map(p => p._id === player._id
                ? player
                : p)
            )
            )
          }
          this.setState({
            isModalEditOpen: false,
            selectedPlayer: null
          })
        })
        .catch(() => {
          this.setState({
            isModalEditOpen: false,
            selectedPlayer: null
          })
        })
    }
  }

  render () {
    const {
      players,
      teamOptions
    } = this.props

    const {
      stateLoading,
      stateError,
      isModalViewOpen,
      isModalEditOpen,
      isModalDeleteOpen,
      selectedPlayer
    } = this.state

    return (
      <>
        <Layout
          section='Team Management'
          title='Players'
          icon='user'
        >
          <Grid stackable>
            <Grid.Row>
              <Grid.Column>
                <div className='f-container-wrap'>
                  <Header as='h2'>
                    <Icon name='user plus' />
                    <Header.Content>Add player</Header.Content>
                  </Header>
                  <NewPlayerForm
                    onSubmit={this._handleSubmit}
                    loading={stateLoading}
                    error={stateError}
                    teams={teamOptions}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className='f-container-wrap'>
                  <Header as='h2'>
                    <Icon name='user' />
                    <Header.Content>Handle players</Header.Content>
                  </Header>
                  {players === null ? (
                    <Dimmer active inverted>
                      <Loader inverted content='Loading Players' />
                    </Dimmer>
                  ) : (
                    <Table basic='very' celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Players</Table.HeaderCell>
                          <Table.HeaderCell>Team</Table.HeaderCell>
                          <Table.HeaderCell>Country</Table.HeaderCell>
                          <Table.HeaderCell>Steam64ID</Table.HeaderCell>
                          <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {players.map(player => {
                          const team = teamOptions
                            ? teamOptions.find(team => team.value === player.team)
                            : undefined
                          return (
                            <PlayerTableRow
                              key={player._id}
                              player={player}
                              team={team}
                              onEditModal={this._openEditModal}
                              onDeleteModal={this._openConfirmModal}
                              onViewModal={this._openViewModal}
                            />
                          )
                        })}
                      </Table.Body>
                    </Table>
                  )}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Layout>
        {isModalViewOpen && (
          <ViewPlayerModal
            isOpen={isModalViewOpen}
            onClose={this._closeViewModal}
            player={selectedPlayer}
          />
        )}
        {isModalEditOpen && (
          <EditPlayerModal
            isOpen={isModalEditOpen}
            onClose={this._closeEditModal}
            player={selectedPlayer}
            teams={teamOptions}
            onEdit={this._submitEdit}
          />
        )}
        {isModalDeleteOpen && (
          <ConfirmModal
            modalHeader='Delete player'
            modalBody='Are you sure you want to delete this player'
            isOpen={isModalDeleteOpen}
            onClose={this._closeConfirmModal}
            onDelete={this._deletePlayer}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state: State) => ({
  players: state.dashboard.players,
  teamOptions: state.dashboard.teamsDropdown
})

export default connect(mapStateToProps)(PlayersPage)
