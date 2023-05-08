export default class User {
  id: string
  readonly username: string
  readonly email: string
  readonly password: string
  readonly roles: string[]

  constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }
}