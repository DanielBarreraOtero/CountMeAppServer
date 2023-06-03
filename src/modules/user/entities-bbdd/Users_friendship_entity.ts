import mongoose, { Model, Schema, SchemaTypeOptions, Types } from 'mongoose'
import UserFriendshipsStateEntity from './Users_friendships_state'
import UsersFriendship, { State } from '../models/Users_friendship'
import UserEntity from './User_entity'

SchemaTypeOptions

interface IUserFriendship {
  user1: { type: Types.ObjectId; required: true }
  user2: { type: Types.ObjectId; required: true }
  states: Types.Array<{ state: Types.ObjectId; date: Schema.Types.Date }>
}

interface IUserFriendshipMethods {
  toUserFriendshipModel(): UsersFriendship
}

type UserFriendshipModel = Model<IUserFriendship, {}, IUserFriendshipMethods>

const userFriendshipSchema = new Schema<
  IUserFriendship,
  UserFriendshipModel,
  IUserFriendshipMethods
>({
  user1: { type: Schema.Types.ObjectId, ref: UserEntity },
  user2: { type: Schema.Types.ObjectId, ref: UserEntity },
  states: [
    {
      type: {
        state: {
          type: Schema.Types.ObjectId,
          ref: UserFriendshipsStateEntity,
        },
        date: Schema.Types.Date,
      },
    },
  ],
})

userFriendshipSchema.method(
  'toUserFriendshipModel',
  function toUserFriendshipModel(): UsersFriendship {
    var states: State[] = []

    this.user1.password = undefined
    this.user2.password = undefined

    this.states.forEach((state: any) => {
      states.push({ name: state.state.name, date: state.date })
    })

    return new UsersFriendship({
      id: this._id.toString(),
      user1: this.user1.toUserModel(),
      user2: this.user2.toUserModel(),
      states: states,
    })
  },
)

const UserFriendshipEntity = mongoose.model<
  IUserFriendship,
  UserFriendshipModel
>('users_friendships', userFriendshipSchema)

export default UserFriendshipEntity
