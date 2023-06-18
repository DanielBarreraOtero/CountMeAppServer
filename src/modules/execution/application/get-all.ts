import ExecutionEntity from '../entities-bbdd/Execution_entity'
import Execution from '../models/Execution_model'

export default class GetAll {
  async execute(): Promise<Execution[]> {
    const executions: Execution[] = []
    const executionEntities = await ExecutionEntity.find({})
      .populate('activity')
      .populate('method')
      // .populate('timer')
      .populate('user')

    for (const executionEntity of executionEntities) {
      executions.push(await executionEntity.toExecutionModel())
    }

    return executions
  }
}
