import User from "../../user/models/User_model"

export default class Timer {
  readonly id: string
  readonly name: string
  readonly time: number
  readonly user: User
  readonly countingType: string

  constructor(init?: Partial<Timer>) {
    Object.assign(this, init)
  }
}
