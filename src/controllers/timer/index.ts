import { Request, Response } from 'express'
import GetTimers from '../../modules/timers/application/get-all'
import Timer from '../../modules/timers/models/Timer_model'
import User from '../../modules/user/models/User_model'
import SaveTimer from '../../modules/timers/application/save'
import GetAllForBlock from '../../modules/timers/application/get-all-for-block'
import GetUserByName from '../../modules/user/application/get-by-name'
import GetByUser from '../../modules/timers/application/get-by-user'
import DeleteTimer from '../../modules/timers/application/delete'
import GetLastByUser from '../../modules/execution/application/get-last-by-user'
import Execution from '../../modules/execution/models/Execution_model'
import GetOneById from '../../modules/timers/application/get-one-id'
import { getLastByUser } from '../activity'
import { getLastExecutionByUser } from '../execution'

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
    user: (await new GetUserByName().execute(timerReq.user.username)) as User,
  })

  const timerBD = await new SaveTimer().execute(timer)

  res.status(201).json(timerBD)
}

export const saveExistingTimer = async (req: Request, res: Response) => {
  const timerReq = req.body.timer

  const user = (await new GetUserByName().execute(
    timerReq.user.username,
  )) as User

  const execution = await new GetLastByUser().execute(user.id)

  const timer = new Timer({
    id: timerReq.id,
    name: timerReq.name,
    time: timerReq.time,
    countingType: timerReq.countingType,
    user,
  })

  if (execution instanceof Execution && isInActiveActivity(timer, execution)) {
    res.status(400).json({
      error: 'Timer cannot be modified while its being used by an Activity.',
    })

    return
  }

  const timerBD = await new SaveTimer().execute(timer)

  res.status(200).json(timerBD)
}

export const deleteTimer = async (req: Request, res: Response) => {
  const timer = await new GetOneById().execute(req.params.id)

  if (!timer) {
    res
      .status(400)
      .send({ error: `Couldn't find any Timer by the id: ${req.params.id}` })
    return
  }

  const user = (await new GetUserByName().execute(timer.user.username)) as User

  const execution = await new GetLastByUser().execute(user.id)

  if (execution instanceof Execution && isInActiveActivity(timer, execution)) {
    res.status(400).json({
      error: 'Timer cannot be deleted while its being used by an Activity.',
    })

    return
  }

  const result = await new DeleteTimer().execute(timer.id)

  if (result.deletedCount > 0) {
    res.status(200).send()
  } else {
    res
      .status(400)
      .send({ error: `Couldn't delete Timer with id: ${timer.id}` })
  }
}

function isInActiveActivity(timer: Timer, execution: Execution) {
  // If the activity isn't finished
  if (!execution.activityFinished && execution.method) {
    // Check every timer of the block until the asked timer is found
    for (const block of execution.method.blocks) {
      for (const timerBD of block.timers) {
        if (timer.id === timerBD.id.toString()) {
          // If found
          return true
        }
      }
    }
  }

  // IF activity was finished or timer wans't found
  return false
}
