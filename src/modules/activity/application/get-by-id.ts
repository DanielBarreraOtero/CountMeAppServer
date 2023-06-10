import ActivityEntity from '../entities-bbdd/Activity_entity'
import Activity from '../models/Activity_model'

export default class GetbyId {
  async execute(id: string): Promise<Activity> {
    var activity: Activity = undefined
    const activityEntity = await ActivityEntity.findOne({ _id: id }).populate(
      'user',
    )

    if (activityEntity) {
      activity = activityEntity.toActivityModel()
    }

    return activity
  }
}
