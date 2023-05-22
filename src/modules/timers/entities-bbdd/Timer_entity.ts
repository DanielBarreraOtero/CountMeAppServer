import mongoose, { Model, Schema, Types } from 'mongoose'
import Timer from '../models/Timer_model'
import CountingTypeEntity from './Timer_counting_type_entity'
import UserEntity from '../../user/entities-bbdd/User_entity'
import User from '../../user/models/User_model'

interface ITimer {
  name: { type: String; required: true }
  time: { type: Number; required: true }
  user: { type: Types.ObjectId; required: true }
  countingType: { type: Types.ObjectId; required: true }
}

interface ITimerMethods {
  toTimerModel(): Timer
}

type TimerModel = Model<ITimer, {}, ITimerMethods>

const TimerSchema = new Schema<ITimer, TimerModel, ITimerMethods>({
  name: { type: String, required: true },
  time: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: UserEntity, required: true },
  countingType: {
    type: Schema.Types.ObjectId,
    ref: CountingTypeEntity,
    required: true,
  },
})

TimerSchema.method('toTimerModel', function toTimerModel(): Timer {
  return new Timer({
    id: this._id.toString(),
    name: this.name,
    time: this.time,
    user: new User({
      username: this.user.username,
      email: this.user.email,
    }),
    countingType: this.countingType.name,
  })
})

const TimerEntity = mongoose.model<ITimer, TimerModel>('timers', TimerSchema)

export default TimerEntity
