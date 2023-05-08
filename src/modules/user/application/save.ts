import RoleEntity from '../entities-bbdd/Role_entity'
import UserEntity from '../entities-bbdd/User_entity'
import User from '../models/User_model'
import { hashSync } from 'bcryptjs'

export default class SaveUser {
  async execute(user: User): Promise<User> {
    var rolesBD: any[]
    if (user.id && user.roles.length > 0) {
      rolesBD = await RoleEntity.findByNameArray(user.roles)
    }

    const userEntity = new UserEntity({
      username: user.username,
      email: user.email,
      password: hashSync(user.password),
      _id: user.id ? user.id : undefined,
      roles: rolesBD,
    })

    userEntity.isNew = user.id ? false : true

    var userBD = await (
      await userEntity.save()
    ).populate({
      path: 'roles',
    })

    userBD.password = undefined

    var user = userBD.toUserModel()

    return user
  }
}
