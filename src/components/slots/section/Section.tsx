import React from 'react'
import './section.scss'

export interface SectionProps {
  title: React.ReactNode
  body: Array<{
    node: React.ReactNode
    spacingModifier?: 'LARGE' | 'TIGHT' | 'NONE'
  }>
  border?: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'>
}

export class Section extends React.Component<SectionProps> {
  static defaultProps = {
    border: ['BOTTOM'] as Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'>,
  }

  setBorder = (
    orientation: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'> | undefined
  ) => {
    const property =
      '1px solid var(--figma-color-border)' as React.CSSProperties
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
    const { title, border, body } = this.props

    return (
      <div
        className="section"
        style={{
          ...this.setBorder(border),
        }}
      >
        {title}
        {body.map((item, index) => (
          <div
            key={index}
            className={[
              'section__child',
              item.spacingModifier === 'LARGE' && 'section__child--large',
              item.spacingModifier === 'TIGHT' && 'section__child--tight',
              item.spacingModifier === 'NONE' && 'section__child--none',
            ]
              .filter((n) => n)
              .join(' ')}
          >
            {item.node}
          </div>
        ))}
      </div>
    )
  }
}
