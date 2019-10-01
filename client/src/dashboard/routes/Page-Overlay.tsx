import React, { Component } from 'react'
import {
  Grid,
  Header,
  Icon,
  Input,
  Checkbox,
  Button
} from 'semantic-ui-react'
import { navigateTo, copyToClipboard } from '../lib/text'
import { Layout } from '../components'

interface State {
  url: string,
  hideTeams: boolean,
  hideScore: boolean
}

class OverlayPage extends Component<{}, State> {
  constructor (props: {}) {
    super(props)

    this.state = {
      url: `${window.location.origin}/overlay`,
      hideTeams: false,
      hideScore: false
    }
  }

  _calculateUrl = (hideScore: boolean, hideTeams: boolean) => {
    const base = `${window.location.origin}/overlay`
    const query = hideTeams || hideScore
      ? `?${hideScore
        ? 'hideScore'
        : ''}${hideTeams
        ? `${hideScore
          ? '&'
          : ''}hideTeams`
        : ''}`
      : ''
    return `${base}${query}`
  }

  _toggleHideScore = () => {
    const { hideScore, hideTeams } = this.state
    this.setState({
      hideScore: !hideScore,
      url: this._calculateUrl(!hideScore, hideTeams)
    })
  }

  _toggleHideTeams = () => {
    const { hideScore, hideTeams } = this.state
    this.setState({
      hideTeams: !hideTeams,
      url: this._calculateUrl(hideScore, !hideTeams)
    })
  }

  _navigateToUrl = () => navigateTo(this.state.url)
  _copyUrl = () => copyToClipboard(this.state.url)

  render () {
    const { url, hideTeams, hideScore } = this.state
    return (
      <Layout
        section='Game'
        title='Overlay'
        icon='globe'
      >
        <Grid columns='1' stackable>
          <Grid.Row>
            <Grid.Column>
              <div className='f-container-wrap'>
                <Header as='h2'>
                  <Icon name='globe' />
                  <Header.Content>Overlay</Header.Content>
                </Header>
                <Input
                  value={url}
                  action={{
                    color: 'blue',
                    icon: 'copy',
                    content: 'Copy URL',
                    onClick: this._copyUrl,
                    labelPosition: 'right'
                  }}
                  fluid
                  onClick={this._copyUrl}
                  placeholder='overlay url'
                />
                <div className='settings-group'>
                  <Checkbox
                    toggle
                    label='Hide team panels'
                    checked={hideTeams}
                    onChange={this._toggleHideTeams}
                  />
                </div>
                <div className='settings-group'>
                  <Checkbox
                    toggle
                    label='Hide score panel'
                    checked={hideScore}
                    onChange={this._toggleHideScore}
                  />
                </div>
                <Button
                  primary
                  onClick={this._navigateToUrl}
                >Open overlay</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default OverlayPage
