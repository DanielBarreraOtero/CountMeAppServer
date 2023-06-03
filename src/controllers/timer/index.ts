import { Request, Response } from 'express'
import GetTimers from '../../modules/timers/application/get-all'
import Timer from '../../modules/timers/models/Timer_model'
import User from '../../modules/user/models/User_model'
import SaveTimer from '../../modules/timers/application/save'
import GetAllForBlock from '../../modules/timers/application/get-all-for-block'
import GetUserByName from '../../modules/user/application/get-by-name'
import GetByUser from '../../modules/timers/application/get-by-user'

export const getTimers = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  // Get Timers
  const timers = await new GetTimers().execute()

  // GetAll response
  res.status(200).json(timers)

  next()
}

export const getTimersByUser = async (req: Request, res: Response) => {
  const user = await new GetUserByName().execute(req.params.username)

  if (user instanceof User) {
    // Get Timers
    const timers = await new GetByUser().execute(user.id)

    // Send response
    res.status(200).json(timers)
  } else {
    res.status(400).json({ error: user.error })
  }
}

export const getTimersForBlock = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  // Get Timers
  const timers = await new GetAllForBlock().execute(
    req.params.methodId,
    parseInt(req.params.blockIndex),
  )

  if (timers instanceof Array) {
    // Response
    res.status(200).json(timers)
  } else {
    res.status(400).json(timers)
  }

  next()
}

export const saveNewTimer = async (req: Request, res: Response) => {
  const timerReq = req.body.timer
  const timer = new Timer({
    name: timerReq.name,
    time: timerReq.time,
    countingType: timerReq.countingType,
    user: new User({ id: timerReq.user.id }),
  })

  const timerBD = await new SaveTimer().execute(timer)

  res.status(201).json(timerBD)
}
