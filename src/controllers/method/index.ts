import { Request, Response } from 'express'
import GetMethods from '../../modules/method/application/get-all'
import Method from '../../modules/method/models/Method_model'
import SaveMethod from '../../modules/method/application/save'
import User from '../../modules/user/models/User_model'
import Timer from '../../modules/timers/models/Timer_model'
import GetUserByName from '../../modules/user/application/get-by-name'
import GetByUser from '../../modules/method/application/get-by-user'

export const getMethods = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  // Get Methods
  const methods = await new GetMethods().execute()

  // GetAll response
  res.status(200).json(methods)

  next()
}

export const getMethodsByUser = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  const user = await new GetUserByName().execute(req.params.username)

  if (user instanceof User) {
    // Get Methods
    const methods = await new GetByUser().execute(user.id)

    // GetAll response
    res.status(200).json(methods)

    // next()
  } else {
    res.status(400).json({ error: user.error })
  }
}

export const saveNewMethod = async (req: Request, res: Response) => {
  const blocks: {
    minReps: number
    maxReps: number
    timers: Timer[]
  }[] = []

  const methodReq = req.body.method

  methodReq.blocks.forEach(
    (block: {
      minReps: number
      maxReps: number
      timers: {
        id: string
      }[]
    }) => {
      let timers: Timer[] = []
      block.timers.forEach((timer: { id: string }) => {
        timers.push(new Timer({ id: timer.id }))
      })

      blocks.push({
        minReps: block.minReps,
        maxReps: block.maxReps,
        timers,
      })
    },
  )

  const method = new Method({
    name: methodReq.name,
    visibility: methodReq.visibility,
    isDefault: methodReq.isDefault,
    user: new User({ id: methodReq.user.id }),
    blocks,
  })

  const methodBD = await new SaveMethod().execute(method)

  res.status(201).json(methodBD)
}