import type { Meta, StoryObj } from '@storybook/react'
import Dropzone from '@components/inputs/dropzone/Dropzone'
import { fn } from '@storybook/test'

const meta: Meta<typeof Dropzone> = {
  title: 'Example/Inputs/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof meta>

export const AgeSelect: Story = {
  args: {
    message: 'Drop files here',
    warningMessage: '$1 file was not imported',
    errorMessage: 'Invalid file type',
    cta: 'Import from computer…',
    acceptedMimeTypes: ['image/png', 'application/json', 'application/pdf'],
    isMultiple: true,
    isLoading: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
    onImportFiles: fn(),
  },
}
