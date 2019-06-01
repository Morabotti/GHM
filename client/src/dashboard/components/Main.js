// @flow
import React, { PureComponent, Fragment } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import type { Dispatch } from '../types'
import type { State } from '../../types'

import {
  toggleNavBar,
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
  TopBar,
  HomePage,
  TeamsPage,
  PlayersPage,
  LivePage,
  ConfigPage,
  SettingsPage
} from './'

// $FlowIgnore
import '../index.less'
import 'semantic-ui-css/semantic.min.css'

type Props = {
  show: boolean,
  dispatch: Dispatch
}

class Main extends PureComponent<Props> {
  componentDidMount () {
    this._getCountries()
    this._getTeams()
    this._getPlayers()
    this._getTeamsDropdown()
    this._getMaps()
    this._getMatches()
  }

  _toggleShow = () => {
    const { dispatch, show } = this.props
    const toggle = toggleNavBar(!show)
    dispatch(toggle)
  }

  _getCountries = () => getCountries()
    .then(countries => setCountries(countries))
    .then(this.props.dispatch)

  _getMatches = () => getMatches()
    .then(matches => setMatches(matches))
    .then(this.props.dispatch)

  _getMaps = () => getMaps()
    .then(data => setMaps(data.maps))
    .then(this.props.dispatch)

  _getTeams = () => getTeams()
    .then(teams => setTeams(teams))
    .then(this.props.dispatch)

  _getTeamsDropdown = () => getTeamsDropdown()
    .then(teams => setTeamsDropdown(teams))
    .then(this.props.dispatch)

  _getPlayers = () => getPlayers()
    .then(players => setPlayers(players))
    .then(this.props.dispatch)

  render () {
    const { show } = this.props
    const url = '/dashboard'
    return (
      <BrowserRouter>
        <Fragment>
          <TopBar show={show} toggleShow={this._toggleShow} />
          <SideBar show={show} />
          <div className={`main-container ${!show ? 'fullscreen' : ''}`}>
            <Switch>
              <Route path={url + '/'} exact component={HomePage} />
              <Route path={url + '/live'} exact component={LivePage} />
              <Route path={url + '/config'} exact component={ConfigPage} />
              <Route path={url + '/teams'} exact component={TeamsPage} />
              <Route path={url + '/players'} exact component={PlayersPage} />
              <Route path={url + '/settings'} exact component={SettingsPage} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state: State) => ({
  show: state.dashboard.showNavbar
})

export default connect(mapStateToProps)(Main)
