// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deepEqual } from '../lib/helpers'
import type { State } from '../../types'
import {
  Grid,
  Icon,
  Breadcrumb,
  Accordion,
  Checkbox,
  Form,
  Input,
  Header
} from 'semantic-ui-react'

import type {
  ConfigState
} from '../../common/types'

import {
  configState
} from '../../common/reducer'

import type { Dispatch } from '../types'

import { ConfirmSnackBar } from '../components'

import { getConfigs, updateConfigs } from '../../common/client'
import { setConfig } from '../../common/actions'

type Props = {
  dispatch: Dispatch,
  config: ConfigState
}

type PageState = {
  activeIndex: number,
  configs: ConfigState,
  hasChanges: boolean
}

class ConfigPage extends Component<Props, PageState> {
  state = {
    activeIndex: 0,
    configs: configState,
    hasChanges: false
  }

  componentDidMount () {
    this._fetchSettings()
  }

  _handleSelection = (e: SyntheticEvent<HTMLInputElement>, titleProps: any) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  componentDidUpdate () {
    if (!deepEqual(this.state.configs, this.props.config)) {
      if (!this.state.hasChanges) this.setState({ hasChanges: true })
    } else {
      if (this.state.hasChanges) this.setState({ hasChanges: false })
    }
  }

  _onNumberChange = (e: SyntheticEvent<HTMLInputElement>, { name, value }) => this.setState({
    configs: {
      ...this.state.configs,
      [name]: !isNaN(value) ? Number(value) : 0
    }
  })

  _onCheckboxChange = (e, { name, checked }) => this.setState({
    configs: {
      ...this.state.configs,
      [name]: checked
    }
  })

  _onChange = (e: SyntheticEvent<HTMLInputElement>, { name, value }) => this.setState({
    configs: {
      ...this.state.configs,
      [name]: value
    }
  })

  _saveSettings = () => updateConfigs(this.state.configs)
    .then(c => setConfig(this.state.configs))
    .then(this.props.dispatch)
    .then(x => this.setState({ configs: x.config }))

  _resetSettings = () => this.setState({ configs: this.props.config })

  _fetchSettings = () => getConfigs()
    .then(setConfig)
    .then(this.props.dispatch)
    .then(x => this.setState({ configs: x.config }))
    .catch(e => {
      console.log('Config fetch failed. Creating config.json')
      updateConfigs(this.props.config)
    })

  render () {
    const { activeIndex, hasChanges, configs } = this.state

    return (
      <React.Fragment>
        <div className='f-container-wrap'>
          <Breadcrumb size='massive' >
            <Breadcrumb.Section>Game</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>
              <Icon name='configure' />Config
            </Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div className='f-container'>
          <div className='f-container-inner'>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column>
                  <div className='f-container-wrap'>
                    <Accordion fluid styled>
                      <Accordion.Title active={activeIndex === 0} index={0} onClick={this._handleSelection}>
                        <Icon name='dropdown' />
                        General
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 0}>
                        <Form>
                          <Header as='h3'>HUD Safezones</Header>
                          <Form.Field inline>
                            <label>Left (default 35px):</label>
                            <Input
                              name='safeZoneLeft'
                              value={configs.safeZoneLeft}
                              label='px'
                              labelPosition='right'
                              onChange={this._onNumberChange}
                              placeholder='Left'
                            />
                          </Form.Field>
                          <Form.Field inline>
                            <label>Top (default 20px):</label>
                            <Input
                              name='safeZoneTop'
                              value={configs.safeZoneTop}
                              label='px'
                              labelPosition='right'
                              onChange={this._onNumberChange}
                              placeholder='Top'
                            />
                          </Form.Field>
                          <Form.Field inline>
                            <label>Right (default 35px):</label>
                            <Input
                              name='safeZoneRight'
                              label='px'
                              labelPosition='right'
                              value={configs.safeZoneRight}
                              onChange={this._onNumberChange}
                              placeholder='Right'
                            />
                          </Form.Field>
                          <Form.Field inline>
                            <label>Bottom (default 35px):</label>
                            <Input
                              name='safeZoneBottom'
                              value={configs.safeZoneBottom}
                              label='px'
                              labelPosition='right'
                              onChange={this._onNumberChange}
                              placeholder='Bottom'
                            />
                          </Form.Field>
                        </Form>
                      </Accordion.Content>
                      <Accordion.Title active={activeIndex === 1} index={1} onClick={this._handleSelection}>
                        <Icon name='dropdown' />
                        Radar
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 1}>
                        <div className='settings-group'>
                          <Form>
                            <div className='settings-group'>
                              <Checkbox
                                toggle
                                label='Use custom radar'
                                name='useRadar'
                                checked={configs.useRadar}
                                onChange={this._onCheckboxChange}
                              />
                            </div>
                            <Form.Field inline>
                              <label>Player size</label>
                              <Input
                                name='playerSize'
                                value={configs.playerSize}
                                onChange={this._onNumberChange}
                                label='px'
                                labelPosition='right'
                                placeholder='Player size'
                              />
                            </Form.Field>
                            <Form.Field inline>
                              <label>Bomb size</label>
                              <Input
                                name='bombSize'
                                value={configs.bombSize}
                                onChange={this._onNumberChange}
                                label='px'
                                labelPosition='right'
                                placeholder='Bomb size'
                              />
                            </Form.Field>
                            <Form.Field inline>
                              <label>Radar number size</label>
                              <Input
                                name='radarNumberSize'
                                value={configs.radarNumberSize}
                                onChange={this._onNumberChange}
                                label='px'
                                labelPosition='right'
                                placeholder='Player size'
                              />
                            </Form.Field>
                          </Form>
                        </div>
                      </Accordion.Content>
                      <Accordion.Title active={activeIndex === 2} index={2} onClick={this._handleSelection}>
                        <Icon name='dropdown' />
                        Player plate
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 2}>
                        <div className='settings-group'>
                          <Checkbox
                            toggle
                            label='Use pre-set name (if set)'
                            name='usePreSetName'
                            checked={configs.usePreSetName}
                            onChange={this._onCheckboxChange}
                          />
                        </div>
                        <div className='settings-group'>
                          <Checkbox
                            toggle
                            label='Show team logo next to player name'
                            name='showTeamLogo'
                            checked={configs.showTeamLogo}
                            onChange={this._onCheckboxChange}
                          />
                        </div>
                        <div className='settings-group'>
                          <Checkbox
                            toggle
                            label='Show player nationality (not supported)'
                            name='showPlayerNationality'
                            disabled
                            checked={configs.showPlayerNationality}
                            onChange={this._onCheckboxChange}
                          />
                        </div>
                        <div className='settings-group'>
                          <Checkbox
                            toggle
                            label='Always show player photo container'
                            name='showPlayerPhotoContainerAllways'
                            checked={configs.showPlayerPhotoContainerAllways}
                            onChange={this._onCheckboxChange}
                          />
                        </div>
                        <div className='settings-group'>
                          <Checkbox
                            toggle
                            label='Only show player photo (if set)'
                            name='showPlayerPhotoIfSet'
                            checked={configs.showPlayerPhotoIfSet}
                            onChange={this._onCheckboxChange}
                          />
                          {configs.showPlayerPhotoContainerAllways && configs.showPlayerPhotoIfSet
                            ? <span
                              style={{ marginLeft: '0.75em', color: 'red' }}
                            > (This doesn't take effect if 'showPlayerPhotoContainerAllways' is on) </span>
                            : null
                          }
                        </div>
                      </Accordion.Content>
                    </Accordion>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
        <ConfirmSnackBar
          open={hasChanges}
          onReset={this._resetSettings}
          onSave={this._saveSettings}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: State) => ({
  config: state.common.config
})

export default connect(mapStateToProps)(ConfigPage)
