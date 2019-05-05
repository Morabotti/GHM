// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TeamSubmit } from '../lib/FormDataWrap'
import {
  ConfirmModal,
  ViewTeamModal,
  EditTeamModal
} from './'

import {
  toggleConfirmModal,
  setSelectedItem,
  deleteTeam,
  setTeams,
  setTeamsDropdown,
  toggleViewModal,
  deletePlayersFromTeam,
  toggleEditModal,
  updatedTeam,
  setPlayers
} from '../actions'

import {
  removeTeam,
  getTeamsDropdown,
  updateTeamWithLogo,
  updateTeam,
  getPlayers
} from '../client'

import {
  Grid,
  Icon,
  Breadcrumb,
  Header,
  Form,
  Checkbox,
  Image,
  Button,
  Table,
  Flag,
  Popup
} from 'semantic-ui-react'

import type {
  Dispatch,
  Country,
  Players,
  Teams,
  NewTeam,
  ListElement,
  Player
} from '../types'

import { addTeam } from '../client'

import type { State } from '../../types'

type Props = {
  dispatch: Dispatch,
  countries: Array<Country>,
  teams: Teams,
  players: Array<Player>,
  teamsDropdown: Array<ListElement>,
  confirmModalOpen: boolean,
  selectedItem: number,
  viewModalOpen: boolean,
  editModalOpen: boolean
}

type ComponentState = {
  teamShortName: string,
  teamLongName: string,
  teamCountry: string,
  teamHasLogo: boolean,
  teamLogo: any,
  stateLoading: boolean,
  stateError: boolean
}

class TeamsPage extends Component<Props, ComponentState> {
  fileInputRef: any

  state = {
    teamShortName: '',
    teamLongName: '',
    teamCountry: '',
    teamHasLogo: false,
    teamLogo: null,
    stateLoading: false,
    stateError: false
  }

  constructor() {
    super()
    this.fileInputRef = React.createRef();
  }

  _onchange = (e, { name, value }) => this.setState({ [name]: value })
  _onCheckboxChange = (e, { name, checked }) => this.setState({ [name]: checked })
  _onFileInputChange = (e) => this.setState({ teamLogo: e.target.files[0] })
  _handleInputReset = () => {
    this.fileInputRef.current.value = '';
    this.setState({ teamLogo: null })
  }

  _handleSubmit = () => {
    const { dispatch, teams } = this.props
    const {
      teamShortName,
      teamLongName,
      teamCountry,
      teamHasLogo,
      teamLogo
    } = this.state

    const data = TeamSubmit({
      teamShortName,
      teamLongName,
      teamCountry,
      teamHasLogo,
      teamLogo
    })

    this.setState({ stateLoading: true, stateError: false })

    addTeam(data)
      .then(team => dispatch(setTeams([...teams, team])))
      .catch(e => {
        this.setState({
          stateLoading: false,
          stateError: true
        })
      })
      .then(new Promise(resolve => {
        this.setState({
          teamShortName: '',
          teamLongName: '',
          teamCountry: '',
          teamHasLogo: false,
          teamLogo: null,
          stateLoading: false,
          stateError: false
        })
        this.fileInputRef.current.value = '';
        resolve()}))
      .then(this._getTeamsDropdown)
      .catch(e => {
        this.setState({
          stateLoading: false,
          stateError: true
        })
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

  _getTeamsDropdown = () => getTeamsDropdown()
    .then(teams => setTeamsDropdown(teams))
    .then(this.props.dispatch)
  
  _getPlayers = () => getPlayers()
    .then(players => setPlayers(players))
    .then(this.props.dispatch)

  _deleteTeam = () => {
    const { dispatch, selectedItem, teams } = this.props
    if (
      selectedItem !== null &&
      selectedItem !== undefined &&
      teams[selectedItem]._id !== undefined
    ) {
      removeTeam(teams[selectedItem]._id)
        .then(dispatch(deletePlayersFromTeam()))
        .then(dispatch(deleteTeam()))
        .then(this._toggleConfirmModal)
        .then(this._getTeamsDropdown)
        .catch(e => console.log(e))
    }
  }

  _toggleViewModal = () => {
    const { dispatch, viewModalOpen } = this.props
    const toggle = toggleViewModal(!viewModalOpen)
    dispatch(toggle)
  }

  _openViewModal = (index: number) => () => {
    this.props.dispatch(setSelectedItem(index))
    this._toggleViewModal()
  }

  _toggleEditModal = () => {
    const { dispatch, editModalOpen } = this.props
    const toggle = toggleEditModal(!editModalOpen)
    dispatch(toggle)
  }

  _openEditModal = (index: number) => () => {
    this.props.dispatch(setSelectedItem(index))
    this._toggleEditModal()
  }

  _submitEdit = (newTeam: NewTeam) => () => {
    const { teams, selectedItem, dispatch } = this.props

    const teamShortName = newTeam.nameShort
    const teamLongName = newTeam.nameLong
    const teamCountry = newTeam.country
    const teamHasLogo = newTeam.hasLogo
    const oldLogo = newTeam.logoPath
    const teamLogo = newTeam.newLogo

    if (newTeam.hasChangedLogo) {
      const data = TeamSubmit({
        teamShortName,
        teamLongName,
        teamCountry,
        teamHasLogo,
        teamLogo
      })
      updateTeamWithLogo(data, teams[selectedItem]._id)
        .then(teams => dispatch(updatedTeam([teams])))
        .then(this._getTeamsDropdown)
        .then(this._getPlayers)
        .then(this._toggleEditModal)
        .catch(e => console.log(e))
    } else {
      const data = {
        teamNameShort: teamShortName,
        teamNameLong: teamLongName,
        country: teamCountry,
        hasLogo: teamHasLogo,
        logoPath: oldLogo
      }

      updateTeam(data, teams[selectedItem]._id)
        .then(teams => dispatch(updatedTeam([teams])))
        .then(this._getTeamsDropdown)
        .then(this._getPlayers)
        .then(this._toggleEditModal)
        .catch(e => console.log(e))
    }
  }

  render () {
    const {
      countries,
      teamsDropdown,
      teams,
      selectedItem,
      confirmModalOpen,
      players,
      viewModalOpen,
      editModalOpen
    } = this.props

    const {
      teamShortName,
      teamLongName,
      teamCountry, 
      teamHasLogo,
      teamLogo,
      stateLoading,
      stateError
    } = this.state

    const affected = selectedItem !== null
      ? players.filter(player => player.team === teams[selectedItem].teamNameShort)
      : []

    return (
      <React.Fragment>
        <div className='f-container-header'>
          <Breadcrumb size='massive' >
            <Breadcrumb.Section>Team Management</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>
              <Icon name='users' />Teams
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
                      <Icon name='add user' />
                      <Header.Content>Add team</Header.Content>
                    </Header>
                    <Form onSubmit={this._handleSubmit} loading={stateLoading} error={stateError}>
                      <Grid stackable>
                        <Grid.Row>
                          <Grid.Column width={teamHasLogo ? 11 : 16}>
                            <Form.Group widths='equal'>
                              <Form.Input
                                name='teamShortName'
                                value={teamShortName}
                                error={stateError}
                                onChange={this._onchange}
                                fluid label='Team name (Short)'
                                placeholder='Team name (Short)'
                                required
                              />
                              <Form.Input
                                name='teamLongName'
                                value={teamLongName}
                                onChange={this._onchange}
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
                                value={teamCountry}
                                onChange={this._onchange}
                                placeholder='Country'
                              />
                            </Form.Group>
                            <Form.Field>
                              <Checkbox
                                label='Team has Image'
                                name='teamHasLogo'
                                checked={teamHasLogo}
                                onChange={this._onCheckboxChange}
                              />
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column width={5}>
                            <div className={`image-container ${!teamHasLogo ? 'do-not-show' : ''}`}>
                              <Image
                                src={teamLogo === null
                                  ? '/static/default/default-team.png'
                                  : window.URL.createObjectURL(teamLogo)
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
                            <div className={!teamHasLogo ? 'do-not-show' : 'button-layout'}>
                              <input
                                onChange={this._onFileInputChange}
                                className='inputfile'
                                type='file'
                                name="file"
                                ref={this.fileInputRef}
                                accept="image/svg+xml, image/jpeg, image/png"
                              />
                              <Button
                                inverted
                                type='button'
                                color='red'
                                onClick={this._handleInputReset}
                              >
                                Reset
                              </Button>
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Form>
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
                    <Table basic='very' celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Team</Table.HeaderCell>
                          <Table.HeaderCell>Country</Table.HeaderCell>
                          <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                      {teams.map((team, index) => {
                        return (
                          <Table.Row key={team._id}>
                            <Table.Cell>
                              <Header as='h4' image>
                                <Image
                                  src={`/${team.logoPath === null ? 'static/default/default-team.png' : team.logoPath}`}
                                  rounded
                                  size='mini'
                                />
                                <Header.Content>
                                  {team.teamNameShort}
                                  <Header.Subheader>{team.teamNameLong}</Header.Subheader>
                                </Header.Content>
                              </Header>
                            </Table.Cell>
                            <Table.Cell>
                              <Flag name={team.country} />
                              <span>{team.country.toUpperCase()}</span>
                            </Table.Cell>
                            <Table.Cell>
                              <Popup
                                inverted
                                trigger={<Button
                                  primary
                                  icon='eye'
                                  onClick={this._openViewModal(index)}
                                />}
                                content='Show Team'
                              />
                              <Popup
                                inverted
                                trigger={<Button
                                  positive
                                  icon='edit'
                                  onClick={this._openEditModal(index)}
                                />}
                                content='Edit Team'
                              />
                              <Popup
                                inverted
                                trigger={<Button
                                  negative
                                  icon='delete'
                                  onClick={this._openConfirmModal(index)}
                                />}
                                content='Delete Team'
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
            {viewModalOpen ? 
              <ViewTeamModal
                isOpen={viewModalOpen}
                toggleModal={this._toggleViewModal}
                currentTeam={teams[selectedItem]}
                currentPlayers={affected}
              /> : null
            }
            {editModalOpen ?
              <EditTeamModal
                isOpen={editModalOpen}
                toggleModal={this._toggleEditModal}
                currentTeam={teams[selectedItem]}
                currentPlayers={affected}
                onEditDone={this._submitEdit}
                countries={countries}
              /> : null
            }
            {confirmModalOpen ?
              <ConfirmModal
                modalHeader='Delete team'
                modalBody='Are you sure you want to delete this team'
                affectedTargets={affected}
                isOpen={confirmModalOpen}
                toggleModal={this._toggleConfirmModal}
                onDelete={this._deleteTeam}
              /> : null
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: State) => ({
  countries: state.dashboard.countries,
  teams: state.dashboard.teams,
  players: state.dashboard.players,
  teamsDropdown: state.dashboard.teamsDropdown,
  viewModalOpen: state.dashboard.modals.viewModalOpen,
  editModalOpen: state.dashboard.modals.editModalOpen,
  confirmModalOpen: state.dashboard.modals.confirmModalOpen,
  selectedItem: state.dashboard.selectedItem,
})

export default connect(mapStateToProps)(TeamsPage)
