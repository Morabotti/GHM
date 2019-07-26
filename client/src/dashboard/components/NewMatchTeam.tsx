import React from 'react'
import { TeamList } from '../types'
import {
  Header,
  Image,
  Icon
} from 'semantic-ui-react'

interface Props {
  teamClass: 'a' | 'b',
  onClick: () => void,
  team: TeamList | null
}

export default ({
  onClick,
  team,
  teamClass
}: Props) => (
  <div className={`team-${teamClass}`}>
    <div className='select-team' onClick={onClick}>
      {team === null ? (
        <Header as='h2' icon>
          <Icon name='group' />
          Select team
        </Header>
      ) : (
        <div className='chosen'>
          <Image
            src={`/${team.logoPath === null ? 'static/default/default-team.png' : team.logoPath}`}
            wrapped
            size='small'
            centered
          />
          <h2>{team.nameShort}</h2>
        </div>
      )}
    </div>
  </div>
)
