import User from './User_model'

export default class UserToken {
  id: string
  readonly user: User
  readonly token: string

  constructor(init?: Partial<UserToken>) {
    Object.assign(this, init)
  }
}
