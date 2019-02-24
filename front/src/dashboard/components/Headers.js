// @flow
import React from 'react'
import { Icon, Header } from 'semantic-ui-react'
import type { HeaderSizes } from '../types'

type SubHeaderWithIconProps = {
  headerSize: HeaderSizes,
  iconName: string,
  headerText: string,
  subHeaderText: string,
}

export const SubHeaderWithIcon = (props: SubHeaderWithIconProps) => {
  const {
    headerSize,
    iconName,
    headerText,
    subHeaderText
  } = props

  return (
    <Header as={headerSize}>
      <Icon name={iconName} />
      <Header.Content>
        {headerText}
        <Header.Subheader>{subHeaderText }</Header.Subheader>
      </Header.Content>
    </Header>
  )
}
