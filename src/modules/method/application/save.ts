import CountingTypeEntity from '../../timers/entities-bbdd/Timer_counting_type_entity'
import TimerEntity from '../../timers/entities-bbdd/Timer_entity'
import UserEntity from '../../user/entities-bbdd/User_entity'
import MethodEntity from '../entities-bbdd/Method_entity'
import Method from '../models/Method_model'

export default class SaveMethod {
  async execute(method: Method): Promise<Method> {
    const blocks: any[] = []
    method.blocks.forEach((block) => {
      let timers: any[] = []

      block.timers.forEach((timer) => {
        timers.push(
          new TimerEntity({
            _id: timer.id,
          }),
        )
      })

      blocks.push({
        minReps: block.minReps,
        maxReps: block.maxReps,
        timers,
      })
    })

    const methodEntity = new MethodEntity({
      _id: method.id ? method.id : undefined,
      name: method.name,
      visibility: method.visibility,
      isDefault: method.isDefault,
      user: new UserEntity({
        _id: method.user.id,
      }),
      blocks,
    })

    methodEntity.isNew = method.id ? false : true

    var methodBD = await methodEntity.save()

    await methodBD.populate('user')
    await methodBD.populate('blocks.timers')

    var method = await methodBD.toMethodModel()

    return method
  }
}
