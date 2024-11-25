export interface Feature<T> {
  name: string
  description: string
  isActive: boolean
  isPro: boolean
  isNew: boolean
  type: 'SERVICE' | 'DIVISION' | 'ACTION' | 'CONTEXT'
  service: Array<T>
}

export type PlanStatus = 'UNPAID' | 'PAID' | 'NOT_SUPPORTED'
