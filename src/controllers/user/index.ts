import { Request, Response } from 'express'
import User from '../../modules/user/models/User_model'
import SaveUser from '../../modules/user/application/save'
import GetUsers from '../../modules/user/application/get-all'
import GetUser from '../../modules/user/application/get-one'
import DeleteUser from '../../modules/user/application/delete'
import GetUserByName from '../../modules/user/application/get-by-name'
import Session from '../../utils/session'

export const getUsers = async (req: Request, res: Response) => {
  // Get users
  const users = await new GetUsers().execute()

  // Send response
  res.status(200).json(users)
}

export const getUser = async (req: Request, res: Response) => {
  // Validate request

  // Get user
  const result = await new GetUser().execute(req.params.id)

  // Send response
  if (result instanceof User) {
    res.status(200).json(result)
  } else {
    res.status(400).json(result)
  }
}

export const saveNewUser = async (req: Request, res: Response) => {
  const userReq = req.body.user

  if ((await new GetUserByName().execute(userReq.username)) instanceof User) {
    res.status(400).json({
      error: `User "${userReq.username}" already exists.`,
      code: 'duplicate',
    })
    return
  }

  try {
    const user = new User({
      username: userReq.username,
      email: userReq.email,
      password: userReq.password,
      roles: userReq.roles,
    })

    await new SaveUser().execute(user)

    const response = await new Session().loginWithCredentials(
      user.username,
      user.password,
    )

    res.status(201).json(response)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
    return
  }
}

export const saveExistingUser = async (req: Request, res: Response) => {
  const userReq = req.body.user
  const user = new User({
    username: userReq.username,
    email: userReq.email,
    id: userReq.id,
    password: userReq.password,
    roles: userReq.roles,
  })

  const userBD = await new SaveUser().execute(user)

  res.status(200).json(userBD)
}

export const deleteUser = async (req: Request, res: Response) => {
  const result = await new DeleteUser().execute(req.body.id)

  if (result.deletedCount > 0) {
    res.status(200).send()
  } else {
    res
      .status(400)
      .send({ error: `Couldn't find any User by the id: ${req.body.id}` })
  }
}
