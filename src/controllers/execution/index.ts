import { Request, Response } from 'express'
import Execution from '../../modules/execution/models/Execution_model'
import SaveExecution from '../../modules/execution/application/save'
import Activity from '../../modules/activity/models/Activity_model'
import Method from '../../modules/method/models/Method_model'
import Timer from '../../modules/timers/models/Timer_model'
import GetExecutions from '../../modules/execution/application/get-all'
import GetUserByName from '../../modules/user/application/get-by-name'
import User from '../../modules/user/models/User_model'
import GetByUser from '../../modules/execution/application/get-by-user'
import finishActivityExecution from '../../modules/execution/application/finish.activity'
import finishExecution from '../../modules/execution/application/finish.'
import GetLastByUser from '../../modules/execution/application/get-last-by-user'

export const getExecutions = async (req: Request, res: Response) => {
  // Get Executions
  const executions = await new GetExecutions().execute()

  // Send response
  res.status(200).json(executions)
}

export const getExecutionsByUser = async (req: Request, res: Response) => {
  const user = await new GetUserByName().execute(req.params.username)

  if (user instanceof User) {
    // Get Activities
    const executions = await new GetByUser().execute(user.id)

    // Send response
    res.status(200).json(executions)
  } else {
    res.status(400).json({ error: user.error })
  }
}

export const getLastExecutionByUser = async (req: Request, res: Response) => {
  const user = await new GetUserByName().execute(req.params.username)

  if (user instanceof User) {
    // Get Activities
    const execution = await new GetLastByUser().execute(user.id)

    // Send response
    res.status(200).json(execution)
  } else {
    // Can't find User
    res.status(400).json({ error: user.error })
  }
}

export const saveNewExecution = async (req: Request, res: Response) => {
  const execReq = req.body.execution

  const exec = new Execution({
    startDate: new Date(execReq.startDate),
    finishDate: execReq.finishDate ? new Date(execReq.finishDate) : undefined,
    activity: new Activity({ id: execReq.activity.id }),
    activityName: execReq.activityName,
    method: new Method({ id: execReq.method.id }),
    methodName: execReq.methodName,
    timer: new Timer({ id: execReq.timer.id }),
    timerName: execReq.timerName,
    interruptions: execReq.interruptions ? execReq.interruptions : [],
    blockIndex: execReq.blockIndex,
    currentRep: execReq.currentRep,
    timerIndex: execReq.timerIndex,
    activityFinished: execReq.activityFinished,
    user: (await new GetUserByName().execute(execReq.user.username)) as User,
  })

  const execBD = await new SaveExecution().execute(exec)

  res.status(201).json(execBD)
}

export const endActivityExecution = async (req: Request, res: Response) => {
  const execReq = req.body.execution
  const exec = new Execution({
    id: execReq.id,
    finishDate: execReq.finishDate
      ? new Date(execReq.finishDate)
      : new Date(Date.now()),
  })

  const execBD = await new finishActivityExecution().execute(exec)

  res.status(201).json(execBD)
}

export const endExecution = async (req: Request, res: Response) => {
  const execReq = req.body.execution
  const exec = new Execution({
    id: execReq.id,
    finishDate: execReq.finishDate
      ? new Date(execReq.finishDate)
      : new Date(Date.now()),
  })

  const execBD = await new finishExecution().execute(exec)

  res.status(201).json(execBD)
}
