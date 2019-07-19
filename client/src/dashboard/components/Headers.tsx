import React from 'react'
import { Icon, Header, SemanticICONS } from 'semantic-ui-react'
import { HeaderSizes } from '../types'

interface Props {
  headerSize: HeaderSizes,
  iconName: SemanticICONS,
  headerText: string,
  subHeaderText: string
}

export const SubHeaderWithIcon = ({
  headerSize,
  iconName,
  headerText,
  subHeaderText
}: Props) => (
  <Header as={headerSize}>
    <Icon name={iconName} />
    <Header.Content>
      {headerText}
      <Header.Subheader>{subHeaderText }</Header.Subheader>
    </Header.Content>
  </Header>
)
