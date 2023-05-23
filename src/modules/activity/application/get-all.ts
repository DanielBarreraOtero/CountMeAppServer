import ActiviyEntity from '../entities-bbdd/Activity_entity'
import Activity from '../models/Activity_model'

export default class GetAll {
  async execute(): Promise<Activity[]> {
    const activities: Activity[] = []
    const activityEntities = await ActiviyEntity.find({}).populate('user')

    console.log(activityEntities)

    activityEntities.forEach(activityEntity => {
        activities.push(activityEntity.toActivityModel())
    });

    return activities
  }
}