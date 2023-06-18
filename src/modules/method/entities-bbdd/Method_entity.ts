import mongoose, { Model, Schema, Types } from 'mongoose'
import TimerEntity from '../../timers/entities-bbdd/Timer_entity'
import Method from '../models/Method_model'
import Timer from '../../timers/models/Timer_model'
import User from '../../user/models/User_model'
import UserEntity from '../../user/entities-bbdd/User_entity'
import GetOneById from '../../timers/application/get-countingType'

interface IMethod {
  name: { type: string; required: true; unique: true }
  visibility: { type: boolean; required: true }
  isDefault: { type: string; required: true }
  user: { type: Types.ObjectId; required: true }
  blocks: {
    type: Types.Array<{
      minReps: number
      maxReps: number
      timers: { type: Types.Array<Types.ObjectId> }
    }>
    required: true
  }
}

interface IMethodMethods {
  toMethodModel(): Promise<Method>
}

type MethodModel = Model<IMethod, {}, IMethodMethods>

const MethodSchema = new Schema<IMethod, MethodModel, IMethodMethods>({
  name: { type: String, required: true },
  visibility: { type: Boolean, required: true },
  isDefault: { type: Boolean, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: UserEntity,
    required: true,
  },
  blocks: [
    {
      minReps: Number,
      maxReps: Number,
      timers: [
        {
          type: Schema.Types.ObjectId,
          ref: TimerEntity,
        },
      ],
    },
  ],
})

MethodSchema.method(
  'toMethodModel',
  async function toMethodModel(): Promise<Method> {
    const blocks: any[] = []

    for (const block of this.blocks) {
      const timers: Timer[] = []

      for (const timer of block.timers) {
        let countingType = await new GetOneById().execute(timer.countingType)

        timers.push(
          new Timer({
            id: timer._id,
            name: timer.name,
            time: timer.time,
            countingType,
          }),
        )
      }

      blocks.push({
        minReps: block.minReps,
        maxReps: block.maxReps,
        timers,
      })
    }

    return new Method({
      id: this._id.toString(),
      name: this.name,
      visibility: this.visibility,
      isDefault: this.isDefault,
      blocks,
      user: new User({
        username: this.user.username,
        email: this.user.email,
      }),
    })
  },
)

const MethodEntity = mongoose.model<IMethod, MethodModel>(
  'methods',
  MethodSchema,
)

export default MethodEntity
