import React from 'react'
import { TeamSpecific } from '../types'
import {
  Image,
  List
} from 'semantic-ui-react'

interface Props {
  teamClass: 'a' | 'b',
  team: TeamSpecific
}

export default ({
  team,
  teamClass
}: Props) => (
  <div className={`team-${teamClass}`}>
    <div>
      <Image
        src={`/${team.logoPath === null
          ? 'static/default/default-team.png'
          : team.logoPath}`}
        wrapped
        size='small'
        centered
      />
      <h2>{team.nameShort}</h2>
      <List selection verticalAlign='middle'>
        {team.players.map(player => (
          <List.Item key={player.steam64ID}>
            <Image
              avatar
              src={`/${player.imagePath === null
                ? 'static/default/default-player.png'
                : player.imagePath}`} />
            <List.Content>
              <List.Header>{player.firstName} '{player.gameName}' {player.lastName}</List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  </div>
)
