import TimerEntity from '../entities-bbdd/Timer_entity'
import Timer from '../models/Timer_model'

export default class GetByUser {
  async execute(id: string): Promise<Timer[]> {
    const timers: Timer[] = []
    const timerEntities = await TimerEntity.find({ user: id })
      .populate('user')
      .populate({
        path: 'countingType',
      })

    timerEntities.forEach((timerEntity) => {
      timers.push(timerEntity.toTimerModel())
    })

    return timers
  }
}
