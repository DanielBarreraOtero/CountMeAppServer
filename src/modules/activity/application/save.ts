import ActiviyEntity from '../entities-bbdd/Activity_entity'
import Activity from '../models/Activity_model'

export default class SaveActivity {
  async execute(activity: Activity): Promise<Activity> {
    const activityEntity = new ActiviyEntity({
      _id: activity.id ? activity.id : undefined,
      name: activity.name,
      color: activity.color,
      order: activity.order,
      user: activity.user.id,
    })

    activityEntity.isNew = activity.id ? false : true

    var activityBD = await (
      await activityEntity.save()
    ).populate({
      path: 'user',
    })

    var activity = activityBD.toActivityModel()

    return activity
  }
}
