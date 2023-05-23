import mongoose, { Model, Schema, Types } from 'mongoose'
import Execution from '../models/Execution_model'
import Activity from '../../activity/models/Activity_model'
import User from '../../user/models/User_model'
import Method from '../../method/models/Method_model'
import Timer from '../../timers/models/Timer_model'
import ActiviyEntity from '../../activity/entities-bbdd/Activity_entity'
import MethodEntity from '../../method/entities-bbdd/Method_entity'
import TimerEntity from '../../timers/entities-bbdd/Timer_entity'
import UserEntity from '../../user/entities-bbdd/User_entity'

interface IExecution {
  startDate: Date
  finishDate: Date
  user: Types.ObjectId
  activity: Types.ObjectId
  activityName: string
  method: Types.ObjectId
  methodName: string
  timer: Types.ObjectId
  timerName: string
  blockIndex: number
  currentRep: number
  activityFinished: boolean
  interruptions: {
    name: string
    descripction: string
    startDate: Date
    finishDate: Date
  }[]
}

interface IExecutionMethods {
  toExecutionModel(): Execution
}

type ExecutionModel = Model<IExecution, {}, IExecutionMethods>

const ExecutionSchema = new Schema<
  IExecution,
  ExecutionModel,
  IExecutionMethods
>({
  startDate: { type: Date, required: true },
  finishDate: { type: Date, required: false },
  user: { type: Schema.Types.ObjectId, required: true, ref: UserEntity },
  activity: { type: Schema.Types.ObjectId, required: true, ref: ActiviyEntity },
  activityName: { type: String, required: true },
  method: { type: Schema.Types.ObjectId, required: true, ref: MethodEntity },
  methodName: { type: String, required: true },
  timer: { type: Schema.Types.ObjectId, required: true, ref: TimerEntity },
  timerName: { type: String, required: true },
  blockIndex: { type: Number, required: true },
  currentRep: { type: Number, required: true },
  activityFinished: { type: Boolean, required: true },
  interruptions: [
    {
      name: String,
      descripction: String,
      startDate: Date,
      finishDate: Date,
    },
  ],
})

ExecutionSchema.method(
  'toExecutionModel',
  async function toExecutionModel(): Promise<Execution> {
    // Populate the Method to get the timers
    await this.method.populate('blocks.timers')

    // Fill the user
    const user = new User({
      username: this.user.username,
      email: this.user.email,
    })

    // Fill the Activity
    const activity = new Activity({
      id: this.activity._id,
      name: this.activity.name,
      color: this.activity.color,
    })

    // Fill the method
    const blocks: any[] = []

    this.method.blocks.forEach((block: any) => {
      const timers: Timer[] = []

      block.timers.forEach((timer: any) => {
        console.log(timer)

        timers.push(
          new Timer({
            id: timer._id,
            name: timer.name,
            time: timer.time,
            countingType: timer.countingType,
          }),
        )
      })

      blocks.push({
        minReps: block.minReps,
        maxReps: block.maxReps,
        timers,
      })
    })

    const method = new Method({
      id: this.method._id,
      name: this.method.name,
      visibility: this.method.visibility,
      isDefault: this.method.isDefault,
      blocks,
    })

    // Fill the Timer

    const timer = new Timer({
      id: this.timer._id,
      name: this.timer.name,
      time: this.timer.time,
      countingType: this.timer.countingType,
    })

    return new Execution({
      id: this._id.toString(),
      startDate: this.startDate,
      finishDate: this.finishDate,
      user,
      activity,
      activityName: this.activityName,
      method,
      methodName: this.methodName,
      timer,
      timerName: this.timerName,
      blockIndex: this.blockIndex,
      currentRep: this.currentRep,
      activityFinished: this.activityFinished,
      interruptions: this.interruptions,
    })
  },
)

const ExecutionEntity = mongoose.model<IExecution, ExecutionModel>(
  'executions ',
  ExecutionSchema,
)

export default ExecutionEntity
