// @flow
import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { SubHeaderWithIcon } from './'

type Props = {}

class CSGOGeneral extends Component<Props> {
  render () {
    return (
      <div className='f-container'>
        <Grid columns='1' stackable>
          <Grid.Row>
            <Grid.Column>
              <div className='f-container-wrap'>
                <h1><Icon name='globe' /> CSGO | General</h1>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns='2' stackable>
          <Grid.Row>
            <Grid.Column>
              <div className='f-container-wrap'>
                <SubHeaderWithIcon
                  headerSize='h2'
                  headerText='Data set'
                  subHeaderText='Set useful data'
                  iconName='database'
                />
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

export default CSGOGeneral
