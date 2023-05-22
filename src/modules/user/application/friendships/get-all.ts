import UserFriendshipEntity from '../../entities-bbdd/Users_friendship_entity'
import UsersFriendship from '../../models/Users_friendship'

export default class GetAll {
  async execute(): Promise<UsersFriendship[]> {
    const usersFriendships: UsersFriendship[] = []

    const userFriendshipsEntity = await UserFriendshipEntity.find()
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
      usersFriendships.push(userFriendship.toUserFriendshipModel())
    })

    return usersFriendships
  }
}
