import { Request, Response } from 'express'
import GetFriendships from '../../modules/user/application/friendships/get-all'

export const getFriendships = async (req: Request, res: Response) => {
  // Get usersFriendships
  const usersFriendships = await new GetFriendships().execute()

  // Send response
  res.status(200).json(usersFriendships)
}
