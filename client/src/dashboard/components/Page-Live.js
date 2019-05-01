// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { State } from '../../types'
import type { Dispatch, Teams } from '../types'

import { toggleTeamSelectionModal, setSelectedId } from '../actions'
import { TeamSelectionModal } from './'

import {
  Breadcrumb,
  Icon,
  Grid,
  Header,
  Dropdown,
  Image
} from 'semantic-ui-react'

type Props = {
  dispatch: Dispatch,
  teamSelectionModalOpen: boolean,
  teams: Teams,
  selectedId: string,
  maps: Array<string>
}

type ComponentState = {
  a: null | string,
  b: null | string
}

const formats = [
  {
    key: 'bo1',
    text: 'Best of 1',
    value: '1'
  },
  {
    key: 'bo2',
    text: 'Best of 2',
    value: '2'
  },
  {
    key: 'bo3',
    text: 'Best of 3',
    value: '3'
  },
  {
    key: 'bo5',
    text: 'Best of 5',
    value: '5'
  }
]

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

  _onSelectedTeam = (id: string) => () => {
    const { dispatch, selectedId } = this.props
    return new Promise((resolve) => {
      resolve( this.setState({ [selectedId]: id}) )
    })
      .then(this._toggleChooseModal)
      .then(this.props.dispatch(setSelectedId(null)))
  }
  
  render() {
    const {
      teamSelectionModalOpen,
      teams,
      selectedId,
      maps
    } = this.props

    const {
      a,
      b
    } = this.state

    const teamA = a !== null ? teams.find(team => team._id === a) : null
    const teamB = b !== null ? teams.find(team => team._id === b) : null
    console.log(this.state)

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
                <Grid.Column>
                  <div className='f-container-wrap'>
                    <Header as='h2'>
                      <Icon name='fire' />
                      <Header.Content>Live match</Header.Content>
                    </Header>
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
                        {a === null ? (
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
                        <div>
                          <Dropdown
                            text='Select map'
                            icon='map'
                            floating
                            labeled
                            button
                            className='icon'
                          >
                            <Dropdown.Menu>
                              <Dropdown.Header content='Select a map' />
                              {maps.map(map => (
                                <Dropdown.Item key={map} value={map} text={map} />
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className='margin-top-default'>
                        <Dropdown
                            text='Best of'
                            icon='tags'
                            floating
                            labeled
                            button
                            className='icon'
                          >
                            <Dropdown.Menu>
                              <Dropdown.Header content='Select a format' />
                              {formats.map(format => (
                                <Dropdown.Item key={format.value} {...format} />
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className='team-b'>
                        <div className='select-team' onClick={this._openChooseModal('b')}>
                          {b === null ? (
                          <Header as='h2' icon>
                            <Icon name='group' />
                            Select team
                          </Header>
                          ) : (
                            <div className='chosen'>
                              <Image
                                src={`/${teamB.logoPath === null ? 'static/default/default-team.png' : teamB.logoPath}`}
                                wrapped
                                size='small'
                                centered
                              />
                              <h2>{teamB.teamNameShort}</h2>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bo-selector'>

                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {teamSelectionModalOpen ?
              <TeamSelectionModal
                isOpen={teamSelectionModalOpen}
                toggleModal={this._toggleChooseModal}
                onSelected={this._onSelectedTeam}
                teams={teams}
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
  selectedId: state.dashboard.selectedId,
  maps: state.dashboard.maps
})

export default connect(mapStateToProps)(LivePage)