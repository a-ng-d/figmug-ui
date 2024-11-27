import { Feature, PlanStatus } from 'src/types/feature.types'

export class FeatureStatus<T> {
  features: Array<Feature<T>>
  featureName: string
  planStatus: PlanStatus
  suggestion?: string
  result: Feature<T> | undefined

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
    this.result = this.getFeature()
  }

  getFeature(): Feature<T> | undefined {
    return this.features.find((feature) => feature.name === this.featureName)
  }

  isActive(): boolean {
    return this.result?.isActive ?? true
  }

  isPro(): boolean {
    return this.result?.isPro ?? false
  }

  isNew(): boolean {
    return this.result?.isNew ?? false
  }

  isBlocked(): boolean {
    const match = this.result

    if (match !== undefined)
      if (match.isPro && this.planStatus === 'PAID') return false
      else if (!match.isPro && this.planStatus === 'PAID') return false
      else if (!match.isPro && this.planStatus === 'UNPAID') return false
      else return true
    else return true
  }

  isReached(current: number): boolean {
    const match = this.result

    if (match !== undefined && match.limit !== undefined) {
      if (current > match.limit && this.planStatus === 'PAID') return false
      else if (current <= match.limit && this.planStatus === 'PAID')
        return false
      else if (current < match.limit && this.planStatus === 'UNPAID')
        return false
      else return true
    } else return true
  }

  isAvailableAndBlocked(): string | null | undefined {
    if (this.isActive())
      if (!this.isBlocked()) return this.suggestion
      else return null
    else return null
  }
}
