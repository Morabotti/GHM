// @flow
import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'

type Props = {}

class Home extends Component<Props> {
  render () {
    return (
      <div className='f-container'>
        <Grid columns='1' stackable>
          <Grid.Row>
            <Grid.Column>
              <div className='f-container-wrap'>
                <h1><Icon name='home' /> Home</h1>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
    )
  }
}

export default Home
