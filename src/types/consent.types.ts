export interface ConsentConfiguration {
  name: string
  id: string
  icon: string
  description: string
  isConsented: boolean
  action: React.MouseEventHandler & React.KeyboardEventHandler
}
