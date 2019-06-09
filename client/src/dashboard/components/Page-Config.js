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
  Input
} from 'semantic-ui-react'

import type {
  ConfigState
} from '../../common/types'

import {
  configState
} from '../../common/reducer'

import type {
  Dispatch
} from '../types'

import { getConfigs } from '../../common/client'
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

  _onChange = (e: SyntheticEvent<HTMLInputElement>, { name, value }) => this.setState({
    configs: {
      ...this.state.configs,
      [name]: value
    }
  })

  _fetchSettings = () => getConfigs()
    .then(setConfig)
    .then(this.props.dispatch)
    .then(x => this.setState({ configs: x.config }))

  render () {
    const { activeIndex } = this.state
    const { playerSize, bombSize } = this.state.configs

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
                      </Accordion.Content>
                      <Accordion.Title active={activeIndex === 1} index={1} onClick={this._handleSelection}>
                        <Icon name='dropdown' />
                        Radar
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 1}>
                        <div className='settings-group'>
                          <Form>
                            <div className='settings-group'>
                              <Checkbox toggle label='Use custom radar' />
                            </div>
                            <Form.Field inline>
                              <label>Player size</label>
                              <Input
                                name='playerSize'
                                value={playerSize}
                                onChange={this._onNumberChange}
                                placeholder='Player size'
                              />
                            </Form.Field>
                            <Form.Field inline>
                              <label>Bomb size</label>
                              <Input
                                name='bombSize'
                                value={bombSize}
                                onChange={this._onNumberChange}
                                placeholder='Bomb size'
                              />
                            </Form.Field>
                          </Form>
                        </div>
                      </Accordion.Content>
                    </Accordion>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: State) => ({
  config: state.common.config
})

export default connect(mapStateToProps)(ConfigPage)
