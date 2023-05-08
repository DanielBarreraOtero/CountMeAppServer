import mongoose, { Model, Schema, Types } from 'mongoose'
import UserToken from '../models/UserToken_model'

import UserEntity from './User_entity'

interface IToken {
  user: { type: Types.ObjectId; required: true, unique: true }
  token: { type: String; required: true }
}

interface IUserTokenMethods {
  toUserTokenModel(): UserToken
}

type UserTokenModel = Model<IToken, {}, IUserTokenMethods>

const userTokenSchema = new Schema<IToken, UserTokenModel, IUserTokenMethods>({
  user: { type: Schema.Types.ObjectId, ref: UserEntity, required: true },
  token: { type: String, required: true },
})

userTokenSchema.method('toUserTokenModel', function toUserModel(): UserToken {
  this.user.password = undefined

  return new UserToken({
    id: this._id.toString(),
    token: this.token,
    user: this.user.toUserModel(),
  })
})

const UserTokenEntity = mongoose.model<IToken, UserTokenModel>(
  'users_tokens',
  userTokenSchema,
)

export default UserTokenEntity
