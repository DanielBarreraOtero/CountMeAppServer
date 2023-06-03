import MethodEntity from '../entities-bbdd/Method_entity'

export default class DeleteMethod {
  async execute(id: string) {
    return await MethodEntity.deleteOne({ _id: id })
  }
}
