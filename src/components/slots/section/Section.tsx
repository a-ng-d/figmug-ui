import React from 'react'
import { SimpleItem } from '../simple-item/SimpleItem'
import { SectionTitle } from '../../assets/section-title/SectionTitle'
import './section.scss'

export interface SectionProps {
  label: string
  indicator?: string
  childrens: Array<{
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
    const { label, indicator, border, childrens } = this.props

    return (
      <div
        className="section"
        style={{
          ...this.setBorder(border),
        }}
      >
        <SimpleItem
          leftPartSlot={
            <SectionTitle
              label={label}
              indicator={indicator}
            />
          }
          isListItem={false}
        />
        {childrens.map((child, index) => (
          <div
            key={index}
            className={[
              'section__child',
              child.spacingModifier === 'LARGE' && 'section__child--large',
              child.spacingModifier === 'TIGHT' && 'section__child--tight',
              child.spacingModifier === 'NONE' && 'section__child--none',
            ]
              .filter((n) => n)
              .join(' ')}
          >
            {child.node}
          </div>
        ))}
      </div>
    )
  }
}
