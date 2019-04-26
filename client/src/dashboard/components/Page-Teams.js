// @flow
import React, { Component } from 'react'
import { Grid, Icon, Breadcrumb } from 'semantic-ui-react'

type Props = {}

class TeamsPage extends Component<Props> {
  render () {
    return (
      <React.Fragment>
        <div className='f-container-header'>
          <Breadcrumb size='massive' >
            <Breadcrumb.Section>Team Management</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>
              <Icon name='users' />Teams
            </Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div className='f-container'>
          <div className='f-container-inner'>
            <Grid columns='2' stackable>
              <Grid.Row>
                <Grid.Column>
                  <div className='f-container-wrap'>
                    <h2>Data</h2>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className='f-container-wrap'>
                    <h2>Something</h2>
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

export default TeamsPage
