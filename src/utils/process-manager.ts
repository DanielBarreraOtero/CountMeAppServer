import Logger from './logger'
import { closeConn } from './mongo-connector'

export const processClose = async (code: number) => {
  new Logger().info(`Closing app...`)
  process.exitCode = code
  try {
    await closeConn()
  } catch (error: any) {
    new Logger().error(error)
  }
  process.exit()
}

export const processError = async (message: string) => {
  new Logger().showError(message)
  process.exitCode = 1
  try {
    await closeConn()
  } catch (error: any) {
    new Logger().error(error)
  }
  process.exit()
}
