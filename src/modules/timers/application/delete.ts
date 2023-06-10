import TimerEntity from '../entities-bbdd/Timer_entity'

export default class DeleteTimer {
  async execute(id: string) {
    return await TimerEntity.deleteOne({ _id: id })
  }
}
