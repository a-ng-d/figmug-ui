import { it, expect } from 'vitest'
import { FeatureStatus } from './feature-status'
import { Feature } from 'src/types/feature.types'

const features: Array<Feature<'BROWSE' | 'PARTICIPATE'>> = [
  {
    name: 'BROWSE',
    description: '',
    isActive: true,
    isPro: false,
    isNew: false,
    type: 'SERVICE',
    service: ['BROWSE'],
  },
  {
    name: 'PARTICIPATE',
    description: '',
    isActive: true,
    isPro: true,
    isNew: false,
    type: 'SERVICE',
    service: ['PARTICIPATE'],
  },
  {
    name: 'EXPLORE',
    description: '',
    isActive: true,
    isPro: true,
    isNew: true,
    type: 'CONTEXT',
    service: ['BROWSE'],
  },
]

it('BROWSE is available', () => {
  expect(
    new FeatureStatus({
      features: features,
      featureName: 'BROWSE',
      planStatus: 'UNPAID',
    }).isActive()
  ).toBe(true)
})

it('PARTICIPATE is blocked when unpaid and unblocked when paid', () => {
  expect(
    new FeatureStatus({
      features: features,
      featureName: 'PARTICIPATE',
      planStatus: 'UNPAID',
    }).isBlocked()
  ).toBe(true)

  expect(
    new FeatureStatus({
      features: features,
      featureName: 'PARTICIPATE',
      planStatus: 'PAID',
    }).isBlocked()
  ).toBe(false)
})

it('EXPLORE is new when paid or unpaid', () => {
  expect(
    new FeatureStatus({
      features: features,
      featureName: 'EXPLORE',
      planStatus: 'UNPAID',
    }).isNew()
  ).toBe(true)

  expect(
    new FeatureStatus({
      features: features,
      featureName: 'EXPLORE',
      planStatus: 'UNPAID',
    }).isNew()
  ).toBe(true)
})
