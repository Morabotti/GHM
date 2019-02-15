// @flow
import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'

type Props = {}

class CSGOGeneral extends Component<Props> {
  render () {
    return (
      <div className='fCont'>
        <Grid columns='1' stackable>
          <Grid.Row>
            <Grid.Column>
              <div className='fCont-wrap'>
                <h1><Icon name='globe' /> CSGO | General</h1>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns='2' stackable>
          <Grid.Row>
            <Grid.Column>
              <div className='fCont-wrap'>
                <h2>Data</h2>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='fCont-wrap'>
                <h2>Something</h2>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default CSGOGeneral
