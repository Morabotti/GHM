import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Layout } from '../components'

class OverlayPage extends Component<{}> {
  render () {
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
                <h2>Overlay</h2>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default OverlayPage
