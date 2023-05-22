import ExecutionEntity from '../entities-bbdd/Execution_entity'
import Execution from '../models/Execution_model'

export default class SaveExecution {
  async execute(execution: Execution): Promise<Execution> {
    const executionEntity = new ExecutionEntity({
      _id: execution.id ? execution.id : undefined,
      startDate: execution.startDate,
      finishDate: execution.finishDate,
      activity: execution.activity.id,
      activityName: execution.activityName,
      method: execution.method.id,
      methodName: execution.methodName,
      timer: execution.timer.id,
      timerName: execution.timerName,
      interruptions: execution.interruptions,
      user: execution.user.id,
      blockIndex: execution.blockIndex,
      currentRep: execution.currentRep,
      activityFinished: execution.activityFinished,
    })

    executionEntity.isNew = execution.id ? false : true

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

    var execution = executionBD.toExecutionModel()

    return execution
  }
}
