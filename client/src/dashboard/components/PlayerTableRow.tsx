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
  PlayerList,
  ListElement
} from '../types'

interface Props {
  player: PlayerList,
  team: ListElement | undefined,
  onViewModal: (id: string) => () => void,
  onEditModal: (id: string) => () => void,
  onDeleteModal: (id: string) => () => void
}

export default ({
  player,
  team,
  onViewModal,
  onEditModal,
  onDeleteModal
}: Props) => (
  <Table.Row>
    <Table.Cell>
      <Header as='h4' image>
        <Image
          src={`/${player.imagePath === null ? 'static/default/default-player.png' : player.imagePath}`}
          rounded
          size='mini'
        />
        <Header.Content>
          {player.gameName}
          <Header.Subheader>{player.firstName} {player.lastName}</Header.Subheader>
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>
      {team
        ? <Image
          src={!team.image.avatar ? '/static/default/default-team.png' : team.image.src}
          avatar />
        : null
      }
      <span>{player.team}</span>
    </Table.Cell>
    <Table.Cell>
      <Flag name={player.country} />
      <span>{player.country.toUpperCase()}</span>
    </Table.Cell>
    <Table.Cell>
      <span>{player.steam64ID}</span>
    </Table.Cell>
    <Table.Cell>
      <Popup
        inverted
        trigger={<Button
          primary
          icon='eye'
          onClick={onViewModal(player._id)}
        />}
        content='Show player'
      />
      <Popup
        inverted
        trigger={<Button
          positive
          icon='edit'
          onClick={onEditModal(player._id)}
        />}
        content='Edit player'
      />
      <Popup
        inverted
        trigger={<Button
          negative
          icon='delete'
          onClick={onDeleteModal(player._id)}
        />}
        content='Delete player'
      />
    </Table.Cell>
  </Table.Row>
)
