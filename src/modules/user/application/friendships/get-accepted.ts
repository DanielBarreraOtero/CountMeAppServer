import mongoose from 'mongoose'
import UsersFriendship from '../../models/Users_friendship'
import UserFriendshipEntity from '../../entities-bbdd/Users_friendship_entity'

export default class GetAccepted {
  async execute(id: string): Promise<UsersFriendship[]> {
    const usersFriendships: UsersFriendship[] = []

    const userFriendshipsEntities = await UserFriendshipEntity.aggregate([
      {
        $match: {
          $or: [
            {
              user1: new mongoose.Types.ObjectId(id),
            },
            {
              user2: new mongoose.Types.ObjectId(id),
            },
          ],
        },
      },
      {
        $project: {
          lastState: {
            $arrayElemAt: ['$states', -1],
          },
          user1: '$user1',
          user2: '$user2',
        },
      },
      {
        $match: {
          'lastState.state': new mongoose.Types.ObjectId(
            '6459375aabf2468f3ae9a438',
          ),
        },
      },
    ])

    for (const userFriendshipResult of userFriendshipsEntities) {
      var userFriendshipEntity = await UserFriendshipEntity.findOne({
        _id: userFriendshipResult._id,
      })
        .populate({
          path: 'user1',
        })
        .populate({
          path: 'user2',
        })
        .populate({
          path: 'states.state',
        })

      var usersFriendship = userFriendshipEntity.toUserFriendshipModel()

      usersFriendship.user1.id = undefined
      usersFriendship.user2.id = undefined

      usersFriendships.push(usersFriendship)
    }

    return usersFriendships
  }
}
