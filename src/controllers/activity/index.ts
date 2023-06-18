import { Request, Response } from 'express'
import GetActivites from '../../modules/activity/application/get-all'
import Activity from '../../modules/activity/models/Activity_model'
import SaveActivity from '../../modules/activity/application/save'
import User from '../../modules/user/models/User_model'
import GetByUser from '../../modules/activity/application/get-by-user'
import GetUserByName from '../../modules/user/application/get-by-name'
import GetLastActivityByUser from '../../modules/activity/application/get-last'
import GetLastExecutionByUser from '../../modules/execution/application/get-last-by-user'
import DeleteActivity from '../../modules/activity/application/delete'
import GetbyId from '../../modules/activity/application/get-by-id'
import Execution from '../../modules/execution/models/Execution_model'
import { Error, MongooseError } from 'mongoose'

export const getActivities = async (req: Request, res: Response) => {
  // Get Activities
  const activities = await new GetActivites().execute()

  // Send response
  res.status(200).json(activities)
}

export const getActivitiesByUser = async (req: Request, res: Response) => {
  const user = await new GetUserByName().execute(req.params.username)

  if (user instanceof User) {
    // Get Activities
    const activities = await new GetByUser().execute(user.id)

    // Send response
    res.status(200).json(activities)
  } else {
    res.status(400).json({ error: user.error })
  }
}

export const getLastByUser = async (req: Request, res: Response) => {
  const user = await new GetUserByName().execute(req.params.username)

  if (user instanceof User) {
    // Get Activity
    const activity = await new GetLastActivityByUser().execute(user.id)

    // Send response
    res.status(200).json(activity)
  } else {
    res.status(400).json({ error: user.error })
  }
}

export const saveNewActivity = async (req: Request, res: Response) => {
  const activityReq = req.body.activity
  const activity = new Activity({
    name: activityReq.name,
    color: activityReq.color,
    order: activityReq.order,
    user: (await new GetUserByName().execute(
      activityReq.user.username,
    )) as User,
  })

  try {
    const activitiesBD = await new SaveActivity().execute(activity)
    res.status(201).json(activitiesBD)
  } catch (error: any) {
    console.log(error.message)

    if ((error.message as string).includes('E11000')) {
      res.status(400).json({
        error: `The activity with name '${activity.name}', already exists for user '${activity.user.username}'`,
      })
    } else {
      res.status(500).send()
    }
  }
}

export const saveExistingActivity = async (req: Request, res: Response) => {
  const activityReq = req.body.activity

  const user = (await new GetUserByName().execute(
    activityReq.user.username,
  )) as User

  const activity = new Activity({
    id: activityReq.id,
    name: activityReq.name,
    color: activityReq.color,
    order: activityReq.order,
    user,
  })

  try {
    const execution = await new GetLastExecutionByUser().execute(user.id)

    if (
      execution instanceof Execution &&
      execution.activity &&
      execution.activity.id === activity.id &&
      !execution.activityFinished
    ) {
      res.status(400).json({
        error: 'Activity cannot be modified while its being executed.',
      })

      return
    }

    const activitiesBD = await new SaveActivity().execute(activity)

    res.status(200).json(activitiesBD)
  } catch (error: any) {
    console.log(error.message)

    if ((error.message as string).includes('No document found')) {
      res.status(400).json({
        error: `Activity '${activity.id}' not found.`,
      })
      return
    } else if (
      (error.message as string).includes('activities validation failed')
    ) {
      res.status(400).json({
        error: `Id '${activity.id}' is not well formated.`,
      })
      return
    }
  }
}

export const deleteActivity = async (req: Request, res: Response) => {
  const activity = await new GetbyId().execute(req.params.id)

  if (!activity) {
    res
      .status(400)
      .send({ error: `Couldn't find any Activity by the id: ${req.params.id}` })
    return
  }

  const user = (await new GetUserByName().execute(
    activity.user.username,
  )) as User

  const execution = await new GetLastExecutionByUser().execute(user.id)

  console.log(execution)

  if (execution instanceof Execution && !execution.activityFinished) {
    res.status(400).json({
      error: 'Activity cannot be deleted while its being executed.',
    })

    return
  }

  const result = await new DeleteActivity().execute(activity.id)

  if (result.deletedCount > 0) {
    res.status(200).send()
  } else {
    res
      .status(400)
      .send({ error: `Couldn't delete Activity with id: ${activity.id}` })
  }
}
