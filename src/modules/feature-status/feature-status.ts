import { Feature, PlanStatus } from 'src/types/feature.types'

export class FeatureStatus<T> {
  features: Array<Feature<T>>
  featureName: string
  planStatus: PlanStatus
  suggestion?: string

  constructor(data: {
    features: Array<Feature<T>>
    featureName: string
    planStatus: PlanStatus
    suggestion?: string
  }) {
    this.features = data.features
    this.featureName = data.featureName
    this.planStatus = data.planStatus
    this.suggestion = data.suggestion
  }

  getFeature(): Feature<T> | undefined {
    return this.features.find((feature) => feature.name === this.featureName)
  }

  isActive(): boolean {
    return this.getFeature()?.isActive || true
  }

  isPro(): boolean {
    return this.getFeature()?.isPro || false
  }

  isNew(): boolean {
    return this.getFeature()?.isNew || false
  }

  isBlocked(): boolean {
    const match = this.getFeature()

    if (match !== undefined)
      if (match.isPro && this.planStatus === 'PAID') return false
      else if (!match.isPro && this.planStatus === 'UNPAID') return false
      else if (!match.isPro && this.planStatus === 'PAID') return false
      else return true
    else return true
  }

  isAvailableAndBlocked(): string | null | undefined {
    if (this.isActive())
      if (!this.isBlocked()) return this.suggestion
      else return null
    else return null
  }
}
