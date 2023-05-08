import UserTokenEntity from '../../entities-bbdd/UserToken_entity'

export default class GetUserTokenByToken {
  public async execute(token: string) {
    try {
      const usersTokenBD = await UserTokenEntity.find({ token }).populate({
        path: 'user',
      })

      if (usersTokenBD[0]) {
        return usersTokenBD[0].toUserTokenModel()
      }

      return { error: `Couldn't find any token like: ${token}` }
    } catch (e) {
      return { error: `The following token is not well formatted: ${token}` }
    }
  }
}
