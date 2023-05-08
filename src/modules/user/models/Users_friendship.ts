import User from './User_model'

export interface State {
  name: string
  date: Date
}

export default class UsersFriendship {
  id: number
  readonly user1: User
  readonly user2: User
  readonly states: Array<State>

  constructor(init?: Partial<UsersFriendship>) {
    Object.assign(this, init)
  }
}
