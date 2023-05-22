import ExecutionEntity from '../entities-bbdd/Execution_entity'
import Execution from '../models/Execution_model'

export default class GetLastByUser {
  async execute(id: string): Promise<Execution | { error: string }> {
    const executionEntity = await ExecutionEntity.findOne({
      user: id,
    })
      .sort({ startDate: -1 })
      .populate('user')
      .populate('activity')
      .populate('method')
      .populate('timer')

    if (executionEntity) {
      const execution = executionEntity.toExecutionModel()
      return execution
    }

    return { error: `Couldn't find any Execution with the username: ` }
  }
}
