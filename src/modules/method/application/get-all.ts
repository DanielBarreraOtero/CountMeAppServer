import MethodEntity from '../entities-bbdd/Method_entity'
import Method from '../models/Method_model'

export default class GetAll {
  async execute(): Promise<Method[]> {
    const methods: Method[] = []

    const methodEntities = await MethodEntity.find({})
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
