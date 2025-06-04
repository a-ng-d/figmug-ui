import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Hooks are reset before each suite
afterEach(() => {
  cleanup()
})
