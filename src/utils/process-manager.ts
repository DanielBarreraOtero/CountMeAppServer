import Logger from './logger'

export const processClose = (code: number) => {
  new Logger().info(`Closing app...`)
  process.exitCode = code
  process.exit()
}

export const processError = (message: string) => {
  new Logger().showError(message)
  process.exitCode = 1
  process.exit()
}
