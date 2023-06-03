import ActivityEntity from '../entities-bbdd/Activity_entity'
import Activity from '../models/Activity_model'

export default class GetLastByUser {
  async execute(id: string): Promise<Activity> {
    var activity: Activity
    const activityEntity = await ActivityEntity.findOne({ user: id })
      .sort({ order: -1 })
      .populate('user')

    console.log(activityEntity)

    activity = activityEntity.toActivityModel()

    return activity
  }
}
