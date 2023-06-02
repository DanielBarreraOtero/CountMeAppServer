import Activity from '../../activity/models/Activity_model'
import Method from '../../method/models/Method_model'
import Timer from '../../timers/models/Timer_model'
import User from '../../user/models/User_model'

export default class Execution {
  readonly id: string
  readonly startDate: Date
  readonly finishDate: Date
  readonly user: User
  readonly activity: Activity
  readonly activityName: string
  readonly method: Method
  readonly methodName: string
  readonly timer: Timer
  readonly timerName: string
  readonly blockIndex: number
  readonly currentRep: number
  readonly timerIndex: number
  readonly activityFinished: boolean
  readonly interruptions: {
    readonly name: string
    readonly descripction: string
    readonly startDate: Date
    readonly finishDate: Date
  }[]

  constructor(init?: Partial<Execution>) {
    Object.assign(this, init)
  }
}
