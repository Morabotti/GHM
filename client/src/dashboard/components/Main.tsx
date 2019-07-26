import React, { PureComponent, Fragment } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Dispatch } from '../types'

import {
  setTeams,
  setPlayers,
  setMatches
} from '../actions'

import {
  fetchMatches,
  fetchPlayers,
  fetchTeams
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
  SettingsPage,
  OverlayPage
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
    this._getTeams()
    this._getPlayers()
    this._getMatches()
  }

  _toggleShow = () => this.setState({
    show: !this.state.show
  })

  _getMatches = () => fetchMatches()
    .then(setMatches)
    .then(this.props.dispatch)

  _getTeams = () => fetchTeams()
    .then(setTeams)
    .then(this.props.dispatch)

  _getPlayers = () => fetchPlayers()
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
              <Route path={url + '/overlay'} exact render={() => <OverlayPage />} />
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
