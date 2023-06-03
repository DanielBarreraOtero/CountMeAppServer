import ActivityEntity from '../entities-bbdd/Activity_entity'
import Activity from '../models/Activity_model'

export default class GetByUser {
  async execute(id: string): Promise<Activity[]> {
    const activities: Activity[] = []
    const activityEntities = await ActivityEntity.find({ user: id })

    activityEntities.forEach((activityEntity) => {
      activities.push(activityEntity.toActivityModel())
    })

    return activities
  }
}
