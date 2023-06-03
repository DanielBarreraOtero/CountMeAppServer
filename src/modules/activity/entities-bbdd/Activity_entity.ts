import mongoose, { Model, Schema, Types } from 'mongoose'
import Activity from '../models/Activity_model'
import UserEntity from '../../user/entities-bbdd/User_entity'
import User from '../../user/models/User_model'

interface IActivity {
  name: { type: string; required: true }
  color: string
  order: number
  user: Types.ObjectId
}

interface IActivityMethods {
  toActivityModel(): Activity
}

type ActivityModel = Model<IActivity, {}, IActivityMethods>

const ActivitySchema = new Schema<IActivity, ActivityModel, IActivityMethods>({
  name: { type: String, required: true },
  color: String,
  order: { type: Number, unique: true },
  user: { type: Schema.Types.ObjectId, ref: UserEntity, unique: true },
})

ActivitySchema.method('toActivityModel', function toActivityModel(): Activity {
  var user = new User({
    username: this.user.username,
    email: this.user.email,
  })

  return new Activity({
    id: this._id,
    name: this.name,
    color: this.color,
    order: this.order,
    user,
  })
})

const ActivityEntity = mongoose.model<IActivity, ActivityModel>(
  'activities',
  ActivitySchema,
)

export default ActivityEntity
