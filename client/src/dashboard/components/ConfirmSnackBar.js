// @flow
import React from 'react'
import {
  Button
} from 'semantic-ui-react'

type Props = {
  open: boolean,
  onReset: () => void,
  onSave: () => void
}

export default (props: Props) => {
  const { open, onReset, onSave } = props

  return (
    <div className={`config-snack-bar-confirm ${open ? 'show' : ''}`}>
      <Button
        color='yellow'
        icon='redo'
        content='Reset Changes'
        style={{ marginRight: '1em' }}
        onClick={onReset}
      />
      <Button
        color='green'
        icon='check'
        content='Save Changes'
        onClick={onSave}
      />
    </div>
  )
}
