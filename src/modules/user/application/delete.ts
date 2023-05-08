import UserEntity from '../entities-bbdd/User_entity'

export default class DeleteUser {
  async execute(id: string) {
    return await UserEntity.deleteOne({ _id: id })
  }
}
