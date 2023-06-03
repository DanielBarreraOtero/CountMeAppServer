import MethodEntity from '../entities-bbdd/Method_entity'
import Method from '../models/Method_model'

export default class GetById {
  async execute(id: string): Promise<Method> {
    const methodEntity = await MethodEntity.findOne({ _id: id })
      .populate({
        path: 'user',
      })
      .populate({
        path: 'blocks.timers',
      })

    const method = methodEntity.toMethodModel()

    return method
  }
}
