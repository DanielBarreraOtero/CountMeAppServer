import Timer from '../../timers/models/Timer_model'
import User from '../../user/models/User_model'

export default class Method {
  readonly id: string
  readonly name: string
  readonly visibility: boolean
  readonly isDefault: boolean
  readonly user: User
  readonly blocks: {
    readonly minReps: number
    readonly maxReps: number
    readonly timers: Timer[]
  }[]

  constructor(init?: Partial<Method>) {
    Object.assign(this, init)
  }
}
