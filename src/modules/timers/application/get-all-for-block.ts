// import User from '../models/User_model'
// import UserEntity from '../entities-bbdd/User_entity'

import GetById from '../../method/application/get-by-id'
import GetUserByName from '../../user/application/get-by-name'
import User from '../../user/models/User_model'
import TimerEntity from '../entities-bbdd/Timer_entity'
import Timer from '../models/Timer_model'

export default class GetAllForBlock {
  async execute(
    methodId: string,
    blockIndex: number,
  ): Promise<Timer[] | { error: string }> {
    const timers: Timer[] = []
    const ids: string[] = []

    const method = await new GetById().execute(methodId)

    if (blockIndex >= method.blocks.length || blockIndex < 0) {
      return {
        error: 'Index Out of Bounds. Max index: ' + (method.blocks.length - 1),
      }
    }

    const user = await new GetUserByName().execute(method.user.username)

    if (!(user instanceof User)) {
      return user
    }

    method.blocks[blockIndex].timers.forEach((timer) => {
      ids.push(timer.id)
    })

    const timerEntities = await TimerEntity.find({
      _id: {
        $nin: ids,
      },
      user: user.id,
    })
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
