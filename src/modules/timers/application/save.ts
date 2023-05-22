import CountingTypeEntity from '../entities-bbdd/Timer_counting_type_entity'
import TimerEntity from '../entities-bbdd/Timer_entity'
import Timer from '../models/Timer_model'

export default class SaveTimer {
  async execute(timer: Timer): Promise<Timer> {
    var countingType = await CountingTypeEntity.findOne(
      { name: timer.countingType },
      { _id: 1 },
    )

    const timerEntity = new TimerEntity({
      _id: timer.id ? timer.id : undefined,
      name: timer.name,
      time: timer.time,
      countingType,
      user: timer.user.id,
    })

    timerEntity.isNew = timer.id ? false : true

    var timerBD = await timerEntity.save()

    await timerBD.populate('user')
    await timerBD.populate('countingType')

    console.log(timerBD)

    var timer = timerBD.toTimerModel()

    return timer
  }
}
