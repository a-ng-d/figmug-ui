import React from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './section.scss'

export interface SectionProps {
  id?: string
  title: React.ReactNode
  body: Array<{
    node?: React.ReactNode
    spacingModifier?: 'LARGE' | 'TIGHT' | 'NONE'
  }>
  border?: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'>
}

export default class Section extends React.Component<SectionProps> {
  setBorder = (
    orientation: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'> | undefined
  ) => {
    const property = 'var(--section-border)' as React.CSSProperties
    const styles: { [key: string]: React.CSSProperties } = {}

    if (!orientation) return styles
    orientation.forEach((entry) => {
      if (entry === 'TOP') styles.borderTop = property
      if (entry === 'LEFT') styles.borderLeft = property
      if (entry === 'BOTTOM') styles.borderBottom = property
      if (entry === 'RIGHT') styles.borderRight = property
    })
    return styles
  }

  render() {
    const { id, title, border, body } = this.props

    return (
      <div
        id={id}
        className="section"
        style={{
          ...this.setBorder(border),
        }}
        role="region"
      >
        <div role="presentation">{title}</div>
        {body.map(
          (item, index) =>
            (item.node !== undefined || item.node !== null) && (
              <div
                key={index}
                className={doClassnames([
                  'section__child',
                  item.spacingModifier === 'LARGE' && 'section__child--large',
                  item.spacingModifier === 'TIGHT' && 'section__child--tight',
                  item.spacingModifier === 'NONE' && 'section__child--none',
                ])}
                role="group"
              >
                {item.node}
              </div>
            )
        )}
      </div>
    )
  }
}
