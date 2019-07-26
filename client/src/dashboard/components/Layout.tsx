import React from 'react'
import { Breadcrumb, Icon, SemanticICONS } from 'semantic-ui-react'

interface Props {
  icon: SemanticICONS,
  section: string,
  title: string,
  children: JSX.Element | JSX.Element[]
}

export default ({
  icon,
  section,
  title,
  children
}: Props) => (
  <>
    <div className='f-container-header'>
      <Breadcrumb size='massive' >
        <Breadcrumb.Section>{section}</Breadcrumb.Section>
        <Breadcrumb.Divider icon='right angle' />
        <Breadcrumb.Section active>
          <Icon name={icon} />{title}
        </Breadcrumb.Section>
      </Breadcrumb>
    </div>
    <div className='f-container'>
      <div className='f-container-inner'>
        {children}
      </div>
    </div>
  </>
)
