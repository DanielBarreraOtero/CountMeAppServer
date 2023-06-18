import CountingTypeEntity from '../entities-bbdd/Timer_counting_type_entity'

export default class GetOneById {
  async execute(id: string): Promise<string> {
    const countingEntity = await CountingTypeEntity.findOne({ _id: id })

    return countingEntity.name
  }
}
