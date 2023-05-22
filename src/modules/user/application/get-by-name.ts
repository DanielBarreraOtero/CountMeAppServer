import UserEntity from '../entities-bbdd/User_entity'

export default class GetUserByName {
  async execute(username: string) {
    try {
      const usersBD = await UserEntity.find(
        { username },
        { password: 0 },
      ).populate({
        path: 'roles',
      })

      if (usersBD[0]) {
        return usersBD[0].toUserModel()
      }

      return { error: `Couldn't find any user by the username: ${username}` }
    } catch (e) {
      return { error: `The following username is not well formatted: ${username}` }
    }
  }
}
