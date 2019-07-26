import React from 'react'

import {
  Table,
  Header,
  Image,
  Popup,
  Button,
  Flag
} from 'semantic-ui-react'

import {
  TeamList
} from '../types'

interface Props {
  team: TeamList,
  onViewModal: (id: string) => () => void,
  onEditModal: (id: string) => () => void,
  onDeleteModal: (id: string) => () => void
}

export default ({
  team,
  onViewModal,
  onEditModal,
  onDeleteModal
}: Props) => (
  <Table.Row>
    <Table.Cell>
      <Header as='h4' image>
        <Image
          src={`/${team.logoPath === null ? 'static/default/default-team.png' : team.logoPath}`}
          rounded
          size='mini'
        />
        <Header.Content>
          {team.nameShort}
          <Header.Subheader>{team.nameLong}</Header.Subheader>
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>
      <Flag name={team.country} />
      <span>{team.country.toUpperCase()}</span>
    </Table.Cell>
    <Table.Cell>
      <Popup
        inverted
        trigger={<Button
          primary
          icon='eye'
          onClick={onViewModal(team._id)}
        />}
        content='Show Team'
      />
      <Popup
        inverted
        trigger={<Button
          positive
          icon='edit'
          onClick={onEditModal(team._id)}
        />}
        content='Edit Team'
      />
      <Popup
        inverted
        trigger={<Button
          negative
          icon='delete'
          onClick={onDeleteModal(team._id)}
        />}
        content='Delete Team'
      />
    </Table.Cell>
  </Table.Row>
)
