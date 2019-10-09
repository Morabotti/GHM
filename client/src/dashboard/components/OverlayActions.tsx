import React from 'react'
import { Form } from 'semantic-ui-react'

interface Props {
  onForceSwitch: () => void
}

export default ({
  onForceSwitch
}: Props) => (
  <Form>
    <Form.Group widths='equal'>
      <Form.Button fluid onClick={onForceSwitch} color='instagram'>Force switch sides</Form.Button>
      <Form.Button fluid disabled color='instagram'>TODO</Form.Button>
      <Form.Button fluid disabled color='instagram'>TODO</Form.Button>
    </Form.Group>
  </Form>
)
