import ExecutionEntity from '../entities-bbdd/Execution_entity'
import Execution from '../models/Execution_model'

export default class GetByUser {
  async execute(id: string): Promise<Execution[]> {
    const executions: Execution[] = []
    const executionEntities = await ExecutionEntity.find({
      user: id,
    })
      .populate('user')
      .populate('activity')
      .populate('method')
      // .populate('timer')

    for (const executionEntity of executionEntities) {
      executions.push(await executionEntity.toExecutionModel())
    }

    return executions
  }
}
