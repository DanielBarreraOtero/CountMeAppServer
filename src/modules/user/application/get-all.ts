import User from '../models/User_model'
import UserEntitty from '../entities-bbdd/User_entity'

export default class GetAll {
  async execute(): Promise<User[]> {
    const users: User[] = []

    const userEntity = await UserEntitty.find({}, { password: 0 }).populate({
      path: 'roles',
    })

    userEntity.forEach((user) => {
      users.push(user.toUserModel())
    })

    return users
  }
}
