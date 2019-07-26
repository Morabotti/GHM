import React from 'react'

import {
  Table,
  Header,
  Image,
  Popup,
  Button
} from 'semantic-ui-react'

import {
  MatchList
} from '../types'

interface Props {
  match: MatchList,
  onLiveModal: (id: string) => () => void,
  onEditModal: (id: string) => () => void,
  onDeleteModal: (id: string) => () => void
}

export default ({
  match,
  onDeleteModal,
  onLiveModal,
  onEditModal
}: Props) => (
  <Table.Row key={match._id}>
    <Table.Cell>
      {match.teamA && (
        <Header as='h4' image>
          <Image
            src={`/${match.teamA.logoPath === null ? 'static/default/default-team.png' : match.teamA.logoPath}`}
            rounded
            size='mini'
          />
          <Header.Content>
            {match.teamA.nameShort}
            <Header.Subheader>{match.teamA.nameLong}</Header.Subheader>
          </Header.Content>
        </Header>
      )}
    </Table.Cell>
    <Table.Cell>
      {match.teamB && (
        <Header as='h4' image>
          <Image
            src={`/${match.teamB.logoPath === null ? 'static/default/default-team.png' : match.teamB.logoPath}`}
            rounded
            size='mini'
          />
          <Header.Content>
            {match.teamB.nameShort}
            <Header.Subheader>{match.teamB.nameLong}</Header.Subheader>
          </Header.Content>
        </Header>
      )}
    </Table.Cell>
    <Table.Cell>
      <Popup
        inverted
        trigger={<Button
          color={match.isLive ? 'red' : 'orange'}
          icon={match.isLive ? 'pause circle' : 'play circle'}
          onClick={onLiveModal(match._id)}
        />}
        content={match.isLive ? 'End match' : 'Start match'}
      />
      <Popup
        inverted
        trigger={<Button
          positive
          icon='edit'
          disabled
          onClick={onEditModal(match._id)}
        />}
        content='Edit match'
      />
      <Popup
        inverted
        trigger={<Button
          negative
          icon='delete'
          onClick={onDeleteModal(match._id)}
        />}
        content='Delete match'
      />
    </Table.Cell>
  </Table.Row>
)
