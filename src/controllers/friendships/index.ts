import { Request, Response } from 'express'
import GetFriendships from '../../modules/user/application/friendships/get-all'
import GetPending from '../../modules/user/application/friendships/get-pending'
import GetAccepted from '../../modules/user/application/friendships/get-accepted'

export const getFriendships = async (req: Request, res: Response) => {
  // Get usersFriendships
  const usersFriendships = await new GetFriendships().execute()

  // Send response
  res.status(200).json(usersFriendships)
}


export const getPendingFriendships = async (req: Request, res: Response) => {
  // Get usersFriendships
  const usersFriendships = await new GetPending().execute(req.params.id)

  // Send response
  res.status(200).json(usersFriendships)
}

export const getAcceptedFriendships = async (req: Request, res: Response) => {
  // Get usersFriendships
  const usersFriendships = await new GetAccepted().execute(req.params.id)

  // Send response
  res.status(200).json(usersFriendships)
}