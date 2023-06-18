import MethodEntity from '../entities-bbdd/Method_entity'
import Method from '../models/Method_model'

export default class GetByUser {
  async execute(id: string): Promise<Method[]> {
    const methods: Method[] = []

    const methodEntities = await MethodEntity.find({ user: id })
      .populate({
        path: 'user',
      })
      .populate({
        path: 'blocks.timers',
      })

    for (const method of methodEntities) {
      methods.push(await method.toMethodModel())
    }

    return methods
  }
}
