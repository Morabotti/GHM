import React, { PureComponent, Fragment } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Dispatch } from '../types'

import {
  setCountries,
  setTeams,
  setPlayers,
  setTeamsDropdown,
  setMaps,
  setMatches
} from '../actions'

import {
  getCountries,
  getTeams,
  getPlayers,
  getTeamsDropdown,
  getMaps,
  getMatches
} from '../client'

import {
  SideBar,
  TopBar
} from './'

import {
  HomePage,
  TeamsPage,
  PlayersPage,
  LivePage,
  ConfigPage,
  SettingsPage
} from '../routes'

import '../index.less'
import 'semantic-ui-css/semantic.min.css'

interface Props {
  dispatch: Dispatch
}

interface ComponentState {
  show: boolean
}

class Main extends PureComponent<Props, ComponentState> {
  state = {
    show: true
  }

  componentDidMount () {
    this._getCountries()
    this._getTeams()
    this._getPlayers()
    this._getTeamsDropdown()
    this._getMaps()
    this._getMatches()
  }

  _toggleShow = () => this.setState({
    show: !this.state.show
  })

  _getCountries = () => getCountries()
    .then(setCountries)
    .then(this.props.dispatch)

  _getMatches = () => getMatches()
    .then(setMatches)
    .then(this.props.dispatch)

  _getMaps = () => getMaps()
    .then(list => setMaps(list.maps))
    .then(this.props.dispatch)

  _getTeams = () => getTeams()
    .then(setTeams)
    .then(this.props.dispatch)

  _getTeamsDropdown = () => getTeamsDropdown()
    .then(setTeamsDropdown)
    .then(this.props.dispatch)

  _getPlayers = () => getPlayers()
    .then(setPlayers)
    .then(this.props.dispatch)

  render () {
    const { show } = this.state
    const url = '/dashboard'
    return (
      <BrowserRouter>
        <Fragment>
          <TopBar show={show} toggleShow={this._toggleShow} />
          <SideBar show={show} />
          <div className={`main-container ${!show ? 'fullscreen' : ''}`}>
            <Switch>
              <Route path={url + '/'} exact component={HomePage} />
              <Route path={url + '/live'} exact render={() => <LivePage />} />
              <Route path={url + '/config'} exact render={() => <ConfigPage />} />
              <Route path={url + '/teams'} exact render={() => <TeamsPage />} />
              <Route path={url + '/players'} exact render={() => <PlayersPage />} />
              <Route path={url + '/settings'} exact render={() => <SettingsPage />} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default connect()(Main)
