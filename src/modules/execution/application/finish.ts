import ExecutionEntity from '../entities-bbdd/Execution_entity'
import Execution from '../models/Execution_model'

export default class finishExecution {
  async execute(execution: Execution): Promise<Execution> {
    try {
      const executionEntity = await ExecutionEntity.findOne({
        _id: execution.id,
      })

      executionEntity.finishDate = execution.finishDate

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
      // await executionBD.populate({
      //   path: 'timer',
      // })

      var newExecution = await executionBD.toExecutionModel()

      return newExecution
    } catch (error) {
      console.log(error)
    }
  }
}
