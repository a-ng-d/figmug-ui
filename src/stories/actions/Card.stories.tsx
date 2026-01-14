import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import React from 'react'
import texts from '@styles/texts/texts.module.scss'
import Card from '@components/actions/card/Card'
import Button from '@components/actions/button/Button'

const meta = {
  title: 'Components/Actions/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Example of a placeholder image for the demo
const demoImage = 'https://placehold.co/400x184'

export const Default: Story = {
  args: {
    src: demoImage,
    title: 'Card title',
    subtitle: 'Subtitle',
    richText: (
      <span className={texts.type}>This is an example text for the card</span>
    ),
    shouldFill: false,
    action: fn(),
    actions: (
      <>
        <Button
          type="icon"
          icon="star-on"
          size="small"
          state="default"
          action={(
            e: React.MouseEvent<Element> | React.KeyboardEvent<Element>
          ) => {
            e.stopPropagation()
            fn()
          }}
        />
        <Button
          type="icon"
          icon="search"
          size="small"
          state="default"
          action={(
            e: React.MouseEvent<Element> | React.KeyboardEvent<Element>
          ) => {
            e.stopPropagation()
            fn()
          }}
        />
      </>
    ),
  },
}

export const WithoutActions: Story = {
  args: {
    src: demoImage,
    title: 'Card without actions',
    subtitle: 'Informative subtitle',
    richText: (
      <span className={texts.type}>
        This card does not display action buttons on hover
      </span>
    ),
    shouldFill: false,
    action: fn(),
    actions: null,
  },
}

export const WithoutTitle: Story = {
  args: {
    src: demoImage,
    subtitle: 'Card without main title',
    richText: (
      <span className={texts.type}>
        This card has no title, only a subtitle and text
      </span>
    ),
    shouldFill: false,
    action: fn(),
    actions: (
      <Button
        type="icon"
        icon="settings"
        size="small"
        state="default"
        action={(
          e: React.MouseEvent<Element> | React.KeyboardEvent<Element>
        ) => {
          e.stopPropagation()
          fn()
        }}
      />
    ),
  },
}

export const Filled: Story = {
  args: {
    src: demoImage,
    title: 'Card in fill mode',
    subtitle: 'With shouldFill set to true',
    richText: (
      <span className={texts.type}>
        This card uses the shouldFill option to occupy all available space
      </span>
    ),
    shouldFill: true,
    action: fn(),
    actions: (
      <>
        <Button
          type="icon"
          icon="styles"
          size="small"
          state="default"
          action={(
            e: React.MouseEvent<Element> | React.KeyboardEvent<Element>
          ) => {
            e.stopPropagation()
            fn()
          }}
        />
        <Button
          type="icon"
          icon="trash"
          size="small"
          state="default"
          action={(
            e: React.MouseEvent<Element> | React.KeyboardEvent<Element>
          ) => {
            e.stopPropagation()
            fn()
          }}
        />
      </>
    ),
  },
}
