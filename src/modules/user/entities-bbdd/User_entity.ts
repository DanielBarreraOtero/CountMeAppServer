import mongoose, { Model, Schema, Types } from 'mongoose'
import User from '../models/User_model'
import RoleEntity from './Role_entity'

interface IUser {
  username: { type: string; required: true; unique: true }
  email: { type: string; required: true }
  password: { type: string; required: true }
  roles: Types.Array<Types.ObjectId>
}

interface IUserMethods {
  toUserModel(): User
}

type UserModel = Model<IUser, {}, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: RoleEntity }],
})

userSchema.method('toUserModel', function toUserModel(): User {
  var stringRoles: string[] = []

  this.roles.forEach((role: any) => {
    stringRoles.push(role.name)
  })

  return new User({
    id: this._id.toString(),
    username: this.username,
    email: this.email,
    password: this.password,
    roles: stringRoles,
  })
})

const UserEntity = mongoose.model<IUser, UserModel>('users', userSchema)

export default UserEntity
