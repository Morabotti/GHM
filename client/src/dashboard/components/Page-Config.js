// @flow
import React, { Component } from 'react'
import {
  Grid,
  Icon,
  Breadcrumb,
  Accordion,
  Checkbox
} from 'semantic-ui-react'

type Props = {}

type PageState = {
  activeIndex: number
}

class ConfigPage extends Component<Props, PageState> {
  state = { activeIndex: 0 }

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render () {
    const { activeIndex } = this.state

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
                      <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        General
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 0}>
                        <div className='settings-group'>
                          <Checkbox toggle label='Use custom radar' />
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

export default ConfigPage
