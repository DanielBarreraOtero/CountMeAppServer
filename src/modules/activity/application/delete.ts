import ActivityEntity from '../entities-bbdd/Activity_entity'

export default class DeleteActivity {
  async execute(id: string) {
    return await ActivityEntity.deleteOne({ _id: id })
  }
}
