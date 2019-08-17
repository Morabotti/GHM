import React from 'react'
import { useScores } from '../../hooks'
import { MatchSpecific, UpdateActiveScore } from '../types'

import {
  Button,
  Form,
  Header
} from 'semantic-ui-react'

interface Props {
  activeMatch: MatchSpecific,
  forceLoad: () => Promise<Response>,
  openConfirm: (id: string | null) => () => void,
  onUpdateScore: (scores: UpdateActiveScore) => () => void
}

export default ({
  activeMatch,
  forceLoad,
  openConfirm,
  onUpdateScore
}: Props) => {
  const {
    scoreA,
    scoreB,
    errorA,
    errorB,
    updateScoreA,
    updateScoreB
  } = useScores(activeMatch.scoreA, activeMatch.scoreB, activeMatch.format)

  return (
    <div className='actions-container'>
      <Button
        fluid
        color='google plus'
        onClick={forceLoad}
      >Force load</Button>
      <Button
        fluid
        color='instagram'
        onClick={openConfirm(activeMatch._id)}
      >Unload match</Button>
      <Button
        fluid
        color='instagram'
        disabled
        onClick={() => {}}
      >Update maps</Button>
      <Form onSubmit={onUpdateScore({ scoreA, scoreB })}>
        <Header as='h2' className='text-center'>Update map score</Header>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label={`${activeMatch.teamA.nameShort} Score`}
            placeholder='Score'
            value={scoreA}
            onChange={updateScoreA}
            error={errorA}
          />
          <Form.Input
            fluid
            label={`${activeMatch.teamB.nameShort} Score`}
            placeholder='Score'
            value={scoreB}
            onChange={updateScoreB}
            error={errorB}
          />
        </Form.Group>
        <Form.Button fluid color='instagram'>Update Score</Form.Button>
      </Form>
    </div>
  )
}
