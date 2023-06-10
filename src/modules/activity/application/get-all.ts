import ActivityEntity from '../entities-bbdd/Activity_entity'
import Activity from '../models/Activity_model'

export default class GetAll {
  async execute(): Promise<Activity[]> {
    const activities: Activity[] = []
    const activityEntities = await ActivityEntity.find({}).populate('user')

    activityEntities.forEach(activityEntity => {
        activities.push(activityEntity.toActivityModel())
    });

    return activities
  }
}
