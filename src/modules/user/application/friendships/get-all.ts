import UserRelationshipEntity from '../../entities-bbdd/Users_friendship_entity'
import UsersFriendship from '../../models/Users_friendship'

export default class GetAll {
  async execute(): Promise<UsersFriendship[]> {
    const usersFriendships: UsersFriendship[] = []

    const userFriendshipsEntity = await UserRelationshipEntity.find()
      .populate({
        path: 'user1',
      })
      .populate({
        path: 'user2',
      })
      .populate({
        path: 'states.state',
      })

    userFriendshipsEntity.forEach((userFriendship) => {
      usersFriendships.push(userFriendship.toUserRelationshipModel())
    })

    return usersFriendships
  }
}
