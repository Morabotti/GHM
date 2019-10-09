import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deepEqual } from '../lib/helpers'
import { State } from '../../types'
import {
  Grid,
  Icon,
  Accordion,
  Checkbox,
  Form,
  Input,
  Header,
  CheckboxProps,
  AccordionTitleProps,
  InputOnChangeData
} from 'semantic-ui-react'

import {
  ConfigState
} from '../../common/types'

import {
  configState
} from '../../common/reducer'

import { Dispatch } from '../types'

import { ConfirmSnackBar, Layout } from '../components'

import { getConfigs, updateConfigs } from '../../common/client'
import { setConfig } from '../../common/actions'

interface Props {
  dispatch: Dispatch,
  config: ConfigState
}

interface PageState {
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

  _handleSelection = (
    event: React.MouseEvent<HTMLDivElement>,
    titleProps: AccordionTitleProps
  ) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    if (newIndex !== undefined) {
      this.setState({ activeIndex: Number(newIndex) })
    }
  }

  componentDidUpdate () {
    if (!deepEqual(this.state.configs, this.props.config)) {
      if (!this.state.hasChanges) this.setState({ hasChanges: true })
    }
    else {
      if (this.state.hasChanges) this.setState({ hasChanges: false })
    }
  }

  _onNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData
  ) => {
    const number = isNaN(Number(value)) ? 0 : Number(value)
    this.setState({
      configs: {
        ...this.state.configs,
        [name]: number
      }
    })
  }

  _onCheckboxChange = (
    e: React.FormEvent<HTMLInputElement>,
    { name, checked }: CheckboxProps
  ) => this.setState({
    configs: {
      ...this.state.configs,
      [name || '']: checked
    }
  })

  _saveSettings = () => updateConfigs(this.state.configs)
    .then(() => {
      this.props.dispatch(
        setConfig(this.state.configs)
      )
      this.setState({ configs: this.state.configs })
    })

  _resetSettings = () => this.setState({ configs: this.props.config })

  _fetchSettings = () => getConfigs()
    .then(configs => {
      this.props.dispatch(
        setConfig(configs)
      )
      this.setState({ configs })
    })
    .catch(() => {
      console.log('Config fetch failed. Creating config.json')
      updateConfigs(this.props.config)
    })

  render () {
    const { activeIndex, hasChanges, configs } = this.state
    return (
      <>
        <Layout
          section='Game'
          title='Config'
          icon='configure'
        >
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
                        <div className='settings-group'>
                          <Checkbox
                            toggle
                            label='Use rounded corners'
                            name='useRoundedCorners'
                            checked={configs.useRoundedCorners}
                            onChange={this._onCheckboxChange}
                          />
                        </div>
                        <div className='settings-group'>
                          <Checkbox
                            toggle
                            label='Disable overlay status indicator'
                            name='disableOverlayIndicator'
                            checked={configs.disableOverlayIndicator}
                            onChange={this._onCheckboxChange}
                          />
                        </div>
                        <div className='settings-group'>
                          <Checkbox
                            toggle
                            label='Dense overlay status indicator'
                            name='useDenseOverlayIndicator'
                            checked={configs.useDenseOverlayIndicator}
                            onChange={this._onCheckboxChange}
                          />
                        </div>
                        <Header as='h3'>Game</Header>
                        <Form.Field inline>
                          <label>Max timeouts (per team):</label>
                          <Input
                            name='maxRounds'
                            value={configs.maxRounds}
                            label='timeouts'
                            labelPosition='right'
                            onChange={this._onNumberChange}
                            placeholder='Number of timeouts'
                          />
                        </Form.Field>
                        <Form.Field inline>
                          <label>Overtime rounds (per overtime):</label>
                          <Input
                            name='otRounds'
                            value={configs.otRounds}
                            label='rounds'
                            labelPosition='right'
                            onChange={this._onNumberChange}
                            placeholder='Number of overtime rounds'
                          />
                        </Form.Field>
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
                              disabled
                              label='Use custom radar (This currently requires changes to backend. See GameStateCore)'
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
        </Layout>
        <ConfirmSnackBar
          open={hasChanges}
          onReset={this._resetSettings}
          onSave={this._saveSettings}
        />
      </>
    )
  }
}

const mapStateToProps = (state: State) => ({
  config: state.common.config
})

export default connect(mapStateToProps)(ConfigPage)
