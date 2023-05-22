import jwt from 'jsonwebtoken'
import UserEntity from '../modules/user/entities-bbdd/User_entity'
import User from '../modules/user/models/User_model'
import { compareSync } from 'bcryptjs'
import SaveUserToken from '../modules/user/application/tokens/save'
import UserToken from '../modules/user/models/UserToken_model'

export default class Session {
  public async generateToken(user: User): Promise<UserToken> {
    // Create Token based on id
    const token = jwt.sign({ id: user.id }, 'tumadretieneunapolla', {
      algorithm: 'HS256',
      expiresIn: '30d',
    })

    const userTokenEntity = await new SaveUserToken().execute(
      new UserToken({ user, token }),
    )

    return userTokenEntity
  }

  public async loginWithCredentials(
    username: string,
    password: string,
  ): Promise<{ ok: boolean; user?: User; token?: string }> {
    // Look for user
    console.log('login por username')
    var userEntity = await UserEntity.findOne({ username }).populate({
      path: 'roles',
    })

    // If found and password is correct
    if (userEntity && compareSync(password, userEntity.password)) {
      // Generates a new token, and saves it in the database
      var userToken = await this.generateToken(userEntity.toUserModel())

      // Returns true, the user, and his new token
      return { ok: true, user: userToken.user, token: userToken.token }
    }
    // Else, returns false
    return { ok: false }
  }

  public async loginWithToken(
    token: string,
  ): Promise<{ ok: boolean; user?: User; token?: string }> {
    console.log('login de token')

    try {
      var { id } = jwt.verify(token, 'tumadretieneunapolla') as jwt.JwtPayload
      var userEntity = await UserEntity.findOne({
        _id: id,
      }).populate({ path: 'roles' })
    } catch (error) {
      return { ok: false }
    }

    // If found
    if (userEntity) {
      // Returns true, the user, and his token
      return { ok: true, user: userEntity.toUserModel(), token }
    }

    // Else, returns false
    return { ok: false }
  }
}
