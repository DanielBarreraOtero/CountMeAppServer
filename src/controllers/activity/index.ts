import { Request, Response } from 'express'
import GetActivites from '../../modules/activity/application/get-all'
import Activity from '../../modules/activity/models/Activity_model'
import SaveActivity from '../../modules/activity/application/save'
import User from '../../modules/user/models/User_model'
import GetByUser from '../../modules/activity/application/get-by-user'
import GetUserByName from '../../modules/user/application/get-by-name'
import GetLastByUser from '../../modules/activity/application/get-last'
import DeleteActivity from '../../modules/activity/application/delete'

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
    const activity = await new GetLastByUser().execute(user.id)

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

  const activitiesBD = await new SaveActivity().execute(activity)

  res.status(201).json(activitiesBD)
}

export const saveExistingActivity = async (req: Request, res: Response) => {
  const activityReq = req.body.activity
  const activity = new Activity({
    id: activityReq.id,
    name: activityReq.name,
    color: activityReq.color,
    order: activityReq.order,
    user: (await new GetUserByName().execute(
      activityReq.user.username,
    )) as User,
  })

  const activitiesBD = await new SaveActivity().execute(activity)

  res.status(200).json(activitiesBD)
}

export const deleteActivity = async (req: Request, res: Response) => {
  const result = await new DeleteActivity().execute(req.params.id)

  if (result.deletedCount > 0) {
    res.status(200).send()
  } else {
    res
      .status(400)
      .send({ error: `Couldn't find any Activity by the id: ${req.params.id}` })
  }
}
