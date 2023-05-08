import UserEntity from '../entities-bbdd/User_entity'

export default class GetUser {
  async execute(id: string) {
    try {
      const usersBD = await UserEntity.find(
        { _id: id },
        { password: 0 },
      ).populate({
        path: 'roles',
      })

      if (usersBD[0]) {
        return usersBD[0].toUserModel()
      }

      return { error: `Couldn't find any user by the id: ${id}` }
    } catch (e) {
      return { error: `The following id is not well formatted: ${id}` }
    }
  }
}
