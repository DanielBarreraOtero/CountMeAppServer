// import User from '../models/User_model'
// import UserEntity from '../entities-bbdd/User_entity'

import TimerEntity from '../entities-bbdd/Timer_entity'
import Timer from '../models/Timer_model'

export default class GetAll {
  async execute(): Promise<Timer[]> {
    const timers: Timer[] = []

    const timerEntities = await TimerEntity.find({})
      .populate({
        path: 'user',
      })
      .populate({
        path: 'countingType',
      })

    timerEntities.forEach((timer) => {
      timers.push(timer.toTimerModel())
    })

    return timers
  }
}
