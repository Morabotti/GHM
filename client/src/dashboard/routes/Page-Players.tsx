import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PlayerSubmit } from '../lib/FormDataWrap'
import {
  addPlayer,
  removePlayer,
  updatePlayerWithImage,
  updatePlayer
} from '../client'

import {
  toggleConfirmModal,
  deletePlayer,
  setSelectedItem,
  setPlayers,
  toggleViewModal,
  toggleEditModal,
  updatedPlayer
} from '../actions'

import {
  Grid, Icon, Breadcrumb, Header, Form,
  Table, Image, Flag, Button, Popup, Checkbox,
  Dimmer, Loader, DropdownProps, InputOnChangeData,
  CheckboxProps
} from 'semantic-ui-react'

import {
  Dispatch,
  Country,
  Players,
  ListElement,
  Team,
  NewPlayer,
  UpdatePlayerNoImage
} from '../types'

import {
  ConfirmModal,
  ViewPlayerModal,
  EditPlayerModal
} from '../components'

import { State } from '../../types'

interface Props {
  dispatch: Dispatch,
  countries: Country[],
  players: Players,
  teams: Team[],
  teamsDropdown: ListElement[],
  confirmModalOpen: boolean,
  selectedItem: number | null,
  viewModalOpen: boolean,
  editModalOpen: boolean,
  loadingPlayers: boolean
}

interface ComponentState {
  playerFirstName: string,
  playerLastName: string,
  playerName: string,
  playerCountry: string,
  playerTeam: string,
  playerSteam64ID: string,
  playerHasImg: boolean,
  playerImg: File | null,
  stateLoading: boolean,
  stateError: boolean
}

const getDefaultState = (): ComponentState => ({
  playerFirstName: '',
  playerLastName: '',
  playerName: '',
  playerCountry: '',
  playerTeam: '',
  playerSteam64ID: '',
  playerHasImg: false,
  playerImg: null,
  stateLoading: false,
  stateError: false
})

class PlayersPage extends Component<Props, ComponentState> {
  private fileInputRef = React.createRef<HTMLInputElement>()
  state = getDefaultState()

  _onChangeString = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value, name }: InputOnChangeData
  ) => this.setState({
    ...this.state,
    [name]: value
  })

  _onChangeDropdown = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    { value, name }: DropdownProps
  ) => this.setState({
    ...this.state,
    [name]: value
  })

  _onChangeCheckbox = (
    e: React.FormEvent<HTMLInputElement>,
    { name, checked }: CheckboxProps
  ) => this.setState({
    ...this.state,
    [name || '']: checked,
    playerImg: checked ? this.state.playerImg : null
  })

  _onChangeFileInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => this.setState({
    playerImg: e.target.files ? e.target.files[0] : null
  })

  _handleInputReset = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = ''
    }
    this.setState({ playerImg: null })
  }

  _handleSubmit = () => {
    const { dispatch, players } = this.props
    const {
      playerFirstName,
      playerLastName,
      playerName,
      playerCountry,
      playerTeam,
      playerSteam64ID,
      playerHasImg,
      playerImg
    } = this.state

    const data = PlayerSubmit({
      playerFirstName,
      playerLastName,
      playerName,
      playerCountry,
      playerTeam,
      playerSteam64ID,
      playerHasImg,
      playerImg
    })

    this.setState({
      stateLoading: true,
      stateError: false
    })

    addPlayer(data)
      .then(player => dispatch(setPlayers([...players, player])))
      .catch(() => {
        this.setState({
          stateLoading: false,
          stateError: true
        })
      })
      .then(() => {
        this.setState(getDefaultState())
        if (this.fileInputRef.current) {
          this.fileInputRef.current.value = ''
        }
      })
      .catch(() => {
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

  _deletePlayer = () => {
    const { dispatch, selectedItem, players } = this.props
    if (
      selectedItem !== null
      && players[selectedItem]._id !== undefined
    ) {
      removePlayer(players[selectedItem]._id)
        .then(() => dispatch(deletePlayer()))
        .then(this._toggleConfirmModal)
        .catch(e => console.log(e))
    }
  }

  _submitEdit = (newPlayer: NewPlayer) => () => {
    const { players, selectedItem, dispatch } = this.props

    const playerFirstName = newPlayer.firstName
    const playerLastName = newPlayer.lastName
    const playerName = newPlayer.gameName
    const playerCountry = newPlayer.country
    const playerTeam = newPlayer.team
    const playerSteam64ID = newPlayer.steam64Id
    const playerHasImg = newPlayer.hasImage
    const playerImg = newPlayer.newImage
    // const playerOldImg = newPlayer.imagePath

    if (selectedItem === null) {
      return
    }

    if (newPlayer.hasNewImage) {
      const data = PlayerSubmit({
        playerFirstName,
        playerLastName,
        playerName,
        playerCountry,
        playerTeam,
        playerSteam64ID,
        playerHasImg,
        playerImg
      })
      updatePlayerWithImage(data, players[selectedItem]._id)
        .then(players => dispatch(updatedPlayer([players])))
        .then(this._toggleEditModal)
        .catch(e => console.log(e))
    }
    else {
      const data: UpdatePlayerNoImage = {
        steam64id: playerSteam64ID,
        firstName: playerFirstName,
        lastName: playerLastName,
        gameName: playerName,
        country: playerCountry,
        team: playerTeam,
        hasImage: playerHasImg
      }

      updatePlayer(data, players[selectedItem]._id)
        .then(players => dispatch(updatedPlayer([players])))
        .then(this._toggleEditModal)
        .catch(e => console.log(e))
    }
  }

  render () {
    const {
      countries, teamsDropdown, players, teams,
      confirmModalOpen, viewModalOpen, selectedItem,
      editModalOpen, loadingPlayers
    } = this.props

    const {
      playerFirstName, playerLastName, playerName, playerCountry,
      playerTeam, playerSteam64ID, playerHasImg, playerImg,
      stateLoading, stateError
    } = this.state

    const teamTarget = selectedItem !== null && players[selectedItem] !== undefined
      ? teams.find(team => team.teamNameShort === players[selectedItem].team)
      : null

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
                    <Form loading={stateLoading} error={stateError} onSubmit={this._handleSubmit}>
                      <Grid stackable>
                        <Grid.Row>
                          <Grid.Column width={playerHasImg ? 11 : 16}>
                            <Form.Group widths='equal'>
                              <Form.Input
                                fluid
                                name='playerFirstName'
                                value={playerFirstName}
                                onChange={this._onChangeString}
                                label='First name'
                                placeholder='First name'
                                required
                              />
                              <Form.Input
                                fluid
                                name='playerLastName'
                                value={playerLastName}
                                onChange={this._onChangeString}
                                label='Last name'
                                placeholder='Last name'
                                required
                              />
                              <Form.Input
                                fluid
                                name='playerName'
                                value={playerName}
                                onChange={this._onChangeString}
                                label='Gamer name'
                                placeholder='Gamer name'
                                required
                              />
                            </Form.Group>
                            <Form.Group widths='equal'>
                              <Form.Select
                                label='Team'
                                options={teamsDropdown}
                                name='playerTeam'
                                value={playerTeam}
                                onChange={this._onChangeDropdown}
                                placeholder='Team'
                                required
                              />
                              <Form.Select
                                label='Country'
                                options={countries}
                                name='playerCountry'
                                value={playerCountry}
                                onChange={this._onChangeDropdown}
                                placeholder='Country'
                              />
                            </Form.Group>
                            <Form.Group widths='equal'>
                              <Form.Input
                                name='playerSteam64ID'
                                value={playerSteam64ID}
                                onChange={this._onChangeString}
                                error={stateError}
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
                                checked={playerHasImg}
                                onChange={this._onChangeCheckbox}
                              />
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column width={5}>
                            <div className={`image-container ${!playerHasImg ? 'do-not-show' : ''}`}>
                              <Image
                                src={playerImg === null
                                  ? '/static/default/default-player.png'
                                  : window.URL.createObjectURL(playerImg)
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
                            <div className={!playerHasImg ? 'do-not-show' : 'button-layout'}>
                              <input
                                onChange={this._onChangeFileInput}
                                className='inputfile'
                                type='file'
                                name='file'
                                ref={this.fileInputRef}
                                accept='image/jpeg, image/png'
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
                      <Icon name='user' />
                      <Header.Content>Handle players</Header.Content>
                    </Header>
                    {loadingPlayers ? (
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
                            <Table.HeaderCell>STEAM64ID</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {players.map((player, index) => {
                            const team = teams.find(val => val.teamNameShort === player.team)
                            return (
                              <Table.Row key={player._id}>
                                <Table.Cell>
                                  <Header as='h4' image>
                                    <Image
                                      src={`/${player.imagePath === null ? 'static/default/default-player.png' : player.imagePath}`}
                                      rounded
                                      size='mini'
                                    />
                                    <Header.Content>
                                      {player.gameName}
                                      <Header.Subheader>{player.firstName} {player.lastName}</Header.Subheader>
                                    </Header.Content>
                                  </Header>
                                </Table.Cell>
                                <Table.Cell>
                                  {team
                                    ? <Image
                                      src={`/${team.logoPath === null ? 'static/default/default-team.png' : team.logoPath}`}
                                      avatar />
                                    : null
                                  }
                                  <span>{player.team}</span>
                                </Table.Cell>
                                <Table.Cell>
                                  <Flag name={player.country} />
                                  <span>{player.country.toUpperCase()}</span>
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
                                      onClick={this._openViewModal(index)}
                                    />}
                                    content='Show player'
                                  />
                                  <Popup
                                    inverted
                                    trigger={<Button
                                      positive
                                      icon='edit'
                                      onClick={this._openEditModal(index)}
                                    />}
                                    content='Edit player'
                                  />
                                  <Popup
                                    inverted
                                    trigger={<Button
                                      negative
                                      icon='delete'
                                      onClick={this._openConfirmModal(index)}
                                    />}
                                    content='Delete player'
                                  />
                                </Table.Cell>
                              </Table.Row>
                            )
                          })}
                        </Table.Body>
                      </Table>
                    )}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {viewModalOpen && selectedItem !== null && (
              <ViewPlayerModal
                isOpen={viewModalOpen}
                toggleModal={this._toggleViewModal}
                currentView={players[selectedItem]}
                players={players}
                currentTeam={teamTarget}
              />
            )}
            {editModalOpen && selectedItem !== null && (
              <EditPlayerModal
                isOpen={editModalOpen}
                toggleModal={this._toggleEditModal}
                currentPlayer={players[selectedItem]}
                currentTeam={teamTarget}
                teams={teamsDropdown}
                onEditDone={this._submitEdit}
                countries={countries}
              />
            )}
            {confirmModalOpen && (
              <ConfirmModal
                modalHeader='Delete player'
                modalBody='Are you sure you want to delete this player'
                isOpen={confirmModalOpen}
                toggleModal={this._toggleConfirmModal}
                onDelete={this._deletePlayer}
              />
            )}
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
  confirmModalOpen: state.dashboard.modals.confirmModalOpen,
  editModalOpen: state.dashboard.modals.editModalOpen,
  viewModalOpen: state.dashboard.modals.viewModalOpen,
  selectedItem: state.dashboard.selectedItem,
  teamsDropdown: state.dashboard.teamsDropdown,
  loadingPlayers: state.dashboard.loadingPlayers
})

export default connect(mapStateToProps)(PlayersPage)
