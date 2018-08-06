import React from 'react'
import { Loader, Segment } from 'semantic-ui-react'

export default () => {
  return (
    <Segment>
        <Loader active inline='centered' content='Loading' />
    </Segment>
  )
}
