import UserTokenEntity from '../../entities-bbdd/UserToken_entity'
import UserToken from '../../models/UserToken_model'

export default class SaveUserToken {
  async execute(userToken: UserToken): Promise<UserToken> {
    const userTokenEntity = new UserTokenEntity({
      _id: userToken.id ? userToken.id : undefined,
      user: userToken.user.id,
      token: userToken.token,
    })

    userTokenEntity.isNew = userToken.id ? false : true

    var userTokenBD = await (
      await userTokenEntity.save()
    ).populate({
      path: 'user',
    })

    var userToken = userTokenBD.toUserTokenModel()

    return userToken
  }
}
