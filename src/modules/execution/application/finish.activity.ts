import ExecutionEntity from '../entities-bbdd/Execution_entity'
import Execution from '../models/Execution_model'

export default class finishActivityExecution {
  async execute(execution: Execution): Promise<Execution> {
    const executionEntity = await ExecutionEntity.findOne({ _id: execution.id })

    console.log(executionEntity);

    executionEntity.finishDate = execution.finishDate
    executionEntity.activityFinished = true

    var executionBD = await executionEntity.save()

    await executionBD.populate({
      path: 'activity',
    })
    await executionBD.populate({
      path: 'user',
    })
    await executionBD.populate({
      path: 'method',
    })
    await executionBD.populate({
      path: 'timer',
    })

    var execution = await executionBD.toExecutionModel()

    return execution
  }
}
