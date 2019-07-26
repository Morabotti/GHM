import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Layout } from '../components'

class SettingsPage extends Component<{}> {
  render () {
    return (
      <Layout
        section='General'
        title='Settings'
        icon='cog'
      >
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
      </Layout>
    )
  }
}

export default SettingsPage
