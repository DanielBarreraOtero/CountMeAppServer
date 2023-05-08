import mongoose, { Model, Schema, SchemaTypeOptions, Types } from 'mongoose'
import UserFriendshipsStateEntity from './Users_friendships_state'
import UsersFriendship, { State } from '../models/Users_friendship'
import UserEntity from './User_entity'

SchemaTypeOptions

interface IUserRelationship {
  user1: { type: Types.ObjectId; required: true; unique: true }
  user2: { type: Types.ObjectId; required: true; unique: true }
  states: Types.Array<{ state: Types.ObjectId; date: Schema.Types.Date }>
}

interface IUserRelationshipMethods {
  toUserRelationshipModel(): UsersFriendship
}

type UserRelationshipModel = Model<
  IUserRelationship,
  {},
  IUserRelationshipMethods
>

const userRelationshipSchema = new Schema<
  IUserRelationship,
  UserRelationshipModel,
  IUserRelationshipMethods
>({
  user1: { type: Schema.Types.ObjectId, ref: UserEntity, unique: true },
  user2: { type: Schema.Types.ObjectId, ref: UserEntity, unique: true },
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

userRelationshipSchema.method(
  'toUserRelationshipModel',
  function toUserRelationshipModel(): UsersFriendship {
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

const UserRelationshipEntity = mongoose.model<
  IUserRelationship,
  UserRelationshipModel
>('users_friendships', userRelationshipSchema)

export default UserRelationshipEntity
