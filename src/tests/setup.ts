import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Hooks are reset before each suite
afterEach(() => {
  cleanup()
})
