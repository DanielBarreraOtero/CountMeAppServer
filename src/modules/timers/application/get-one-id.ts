// import User from '../models/User_model'
// import UserEntity from '../entities-bbdd/User_entity'

import TimerEntity from '../entities-bbdd/Timer_entity'
import Timer from '../models/Timer_model'

export default class GetOneById {
  async execute(id: string): Promise<Timer> {
    var timer: Timer = undefined

    const timerEntitie = await TimerEntity.findOne({ _id: id })
      .populate({
        path: 'user',
      })
      .populate({
        path: 'countingType',
      })

    if (timerEntitie) {
      timer = timerEntitie.toTimerModel()
    }

    return timer
  }
}
