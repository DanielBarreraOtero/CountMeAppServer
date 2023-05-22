import { Request, Response } from 'express'
import GetActivites from '../../modules/activity/application/get-all'
import Activity from '../../modules/activity/models/Activity_model'
import SaveActivity from '../../modules/activity/application/save'
import User from '../../modules/user/models/User_model'
import GetByUser from '../../modules/activity/application/get-by-user'
import GetUserByName from '../../modules/user/application/get-by-name'

export const getActivites = async (req: Request, res: Response) => {
  // Get Activities
  const activities = await new GetActivites().execute()

  // Send response
  res.status(200).json(activities)
}

export const getActivitesByUser = async (req: Request, res: Response) => {
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

export const saveNewActivity = async (req: Request, res: Response) => {
  const activityReq = req.body.activity
  const activity = new Activity({
    name: activityReq.name,
    color: activityReq.color,
    order: activityReq.order,
    user: new User({ id: activityReq.user.id }),
  })

  const activitiesBD = await new SaveActivity().execute(activity)

  res.status(201).json(activitiesBD)
}
