import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newTeamForm } from '../lib/FormDataWrap'

import {
  getTeam,
  addTeam,
  removeTeam,
  updateTeamWithLogo,
  updateTeam
} from '../client'

import {
  ConfirmModal,
  ViewTeamModal,
  EditTeamModal,
  NewTeamForm,
  TeamTableRow,
  Layout
} from '../components'

import {
  Grid,
  Icon,
  Header,
  Table,
  Dimmer,
  Loader
} from 'semantic-ui-react'

import {
  Dispatch,
  TeamList,
  TeamSpecific,
  UpdateTeam,
  PlayerList,
  NewTeam,
  UpdateTeamInfo
} from '../types'

import { State } from '../../types'
import { setTeams, setPlayers } from '../actions'

interface Props {
  dispatch: Dispatch,
  teams: TeamList[] | null,
  players: PlayerList[] | null
}

interface ComponentState {
  stateLoading: boolean,
  stateError: boolean,
  isModalViewOpen: boolean,
  isModalEditOpen: boolean,
  isModalDeleteOpen: boolean,
  selectedTeam: null | TeamSpecific
}

const getDefaultState = (): ComponentState => ({
  stateLoading: false,
  stateError: false,
  isModalViewOpen: false,
  isModalEditOpen: false,
  isModalDeleteOpen: false,
  selectedTeam: null
})

class TeamsPage extends Component<Props, ComponentState> {
  state = getDefaultState()

  _openConfirmModal = (id: string) => () => Promise.resolve(this.setState({
    isModalDeleteOpen: true
  }))
    .then(() => getTeam(id))
    .then(team => this.setState({
      selectedTeam: team
    }))
    .catch(() => this.setState({
      isModalDeleteOpen: false,
      selectedTeam: null
    }))

  _openViewModal = (id: string) => () => Promise.resolve(this.setState({
    isModalViewOpen: true
  }))
    .then(() => getTeam(id))
    .then(team => this.setState({
      selectedTeam: team
    }))
    .catch(() => this.setState({
      isModalViewOpen: false,
      selectedTeam: null
    }))

  _openEditModal = (id: string) => () => Promise.resolve(this.setState({
    isModalEditOpen: true
  }))
    .then(() => getTeam(id))
    .then(team => this.setState({
      selectedTeam: team
    }))
    .catch(() => this.setState({
      isModalEditOpen: true,
      selectedTeam: null
    }))

  _closeEditModal = () => this.setState({
    isModalEditOpen: false,
    selectedTeam: null
  })

  _closeViewModal = () => this.setState({
    isModalViewOpen: false,
    selectedTeam: null
  })

  _closeConfirmModal = () => this.setState({
    isModalDeleteOpen: false,
    selectedTeam: null
  })

  _handleSubmit = (newTeam: UpdateTeam) => {
    const { dispatch, teams } = this.props
    const form = newTeamForm(newTeam)

    this.setState({
      stateLoading: true,
      stateError: false
    })

    return addTeam(form)
      .then(team => {
        dispatch(setTeams([ ...teams, team ]))
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

  _deleteTeam = () => {
    const { selectedTeam } = this.state
    const { dispatch, teams, players } = this.props
    if (selectedTeam === null) {
      return
    }

    removeTeam(selectedTeam._id)
      .then(() => {
        if (teams) {
          dispatch(
            setTeams(
              teams.filter(team => team._id !== selectedTeam._id)
            )
          )
        }
        if (players && selectedTeam.players.length !== 0) {
          dispatch(
            setPlayers(
              players.filter(player => {
                for (const affect of selectedTeam.players) {
                  if (player._id === affect._id) {
                    return false
                  }
                }
                return true
              })
            )
          )
        }
        this.setState({
          isModalDeleteOpen: false,
          selectedTeam: null
        })
      })
      .catch(() => {
        this.setState({
          isModalDeleteOpen: false,
          selectedTeam: null
        })
      })
  }

  _submitEdit = ({
    nameShort,
    nameLong,
    country,
    hasLogo,
    // logoPath,
    hasChangedLogo,
    newLogo
  }: NewTeam) => () => {
    const { teams, dispatch, players } = this.props
    const { selectedTeam } = this.state

    if (selectedTeam === null) {
      return
    }

    if (hasChangedLogo) {
      const form = newTeamForm({
        nameShort,
        nameLong,
        country,
        hasLogo,
        logo: newLogo
      })

      updateTeamWithLogo(form, selectedTeam._id)
        .then(team => {
          if (teams) {
            dispatch(setTeams(teams.map(t => t._id === team._id ? team : t)))
          }
          if (players && selectedTeam.players.length !== 0) {
            dispatch(
              setPlayers(
                players.map(player => {
                  for (const affect of selectedTeam.players) {
                    if (player._id === affect._id) {
                      return {
                        ...player,
                        team: team.nameShort
                      }
                    }
                  }
                  return player
                })
              )
            )
          }
          this.setState({
            isModalEditOpen: false,
            selectedTeam: null
          })
          console.log(team)
        })
    }
    else {
      const data: UpdateTeamInfo = {
        nameShort,
        nameLong,
        country,
        hasLogo: hasLogo
      }

      updateTeam(data, selectedTeam._id)
        .then(team => {
          if (teams) {
            dispatch(setTeams(teams.map(t => t._id === team._id ? team : t)))
          }
          if (players && selectedTeam.players.length !== 0) {
            dispatch(
              setPlayers(
                players.map(player => {
                  for (const affect of selectedTeam.players) {
                    if (player._id === affect._id) {
                      return {
                        ...player,
                        team: team.nameShort
                      }
                    }
                  }
                  return player
                })
              )
            )
          }
          this.setState({
            isModalEditOpen: false,
            selectedTeam: null
          })
        })
    }
  }

  render () {
    const { teams } = this.props

    const {
      stateLoading,
      stateError,
      isModalViewOpen,
      isModalEditOpen,
      isModalDeleteOpen,
      selectedTeam
    } = this.state

    return (
      <>
        <Layout
          section='Team Management'
          title='Teams'
          icon='user'
        >
          <Grid stackable>
            <Grid.Row>
              <Grid.Column>
                <div className='f-container-wrap'>
                  <Header as='h2'>
                    <Icon name='add user' />
                    <Header.Content>Add team</Header.Content>
                  </Header>
                  <NewTeamForm
                    onSubmit={this._handleSubmit}
                    loading={stateLoading}
                    error={stateError}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className='f-container-wrap'>
                  <Header as='h2'>
                    <Icon name='users' />
                    <Header.Content>Handle Teams</Header.Content>
                  </Header>
                  {teams === null ? (
                    <Dimmer active inverted>
                      <Loader inverted content='Loading Teams' />
                    </Dimmer>
                  ) : (
                    <Table basic='very' celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Team</Table.HeaderCell>
                          <Table.HeaderCell>Country</Table.HeaderCell>
                          <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {teams.map(team => {
                          return (
                            <TeamTableRow
                              key={team._id}
                              team={team}
                              onDeleteModal={this._openConfirmModal}
                              onEditModal={this._openEditModal}
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
          <ViewTeamModal
            isOpen={isModalViewOpen}
            onClose={this._closeViewModal}
            team={selectedTeam}
          />
        )}
        {isModalEditOpen && (
          <EditTeamModal
            isOpen={isModalEditOpen}
            team={selectedTeam}
            onClose={this._closeEditModal}
            onEdit={this._submitEdit}
          />
        )}
        {isModalDeleteOpen && (
          <ConfirmModal
            modalHeader='Delete team'
            modalBody='Are you sure you want to delete this team'
            team={selectedTeam}
            isOpen={isModalDeleteOpen}
            onClose={this._closeConfirmModal}
            onDelete={this._deleteTeam}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state: State) => ({
  teams: state.dashboard.teams,
  players: state.dashboard.players
})

export default connect(mapStateToProps)(TeamsPage)
