import mongoose, { Schema } from 'mongoose'

const userFriendshipsStateSchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const UserFriendshipsStateEntity = mongoose.model(
  'users_friendships_states',
  userFriendshipsStateSchema,
)

export default UserFriendshipsStateEntity
