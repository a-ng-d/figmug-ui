import React from 'react'

export interface DropdownOption {
  label?: string
  value?: string
  feature?: string
  position?: number
  type: 'OPTION' | 'TITLE' | 'SEPARATOR'
  isActive?: boolean
  isBlocked?: boolean
  isNew?: boolean
  children?: Array<DropdownOption> | []
  action?: (
    event:
      | React.MouseEvent<HTMLLIElement, MouseEvent>
      | React.KeyboardEvent<HTMLLIElement>
  ) => void
}
