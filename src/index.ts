import express from 'express'
import Logger from './utils/logger'
import Parameters from './utils/parameters'
import { processClose, processError } from './utils/process-manager'

import setRoutes from './routes'
import setMiddlewares from './middlewares'
import { initConn } from './utils/mongo-connector'

async function init() {
  // Variables
  const logger: Logger = new Logger()
  const parameters: Parameters = new Parameters()

  try {
    // Variables
    const app = express()

    // Process
    process.on('exit', processClose)
    process.on('SIGINT', processClose)
    process.on('SIGUSR1', processClose)
    process.on('SIGUSR2', processClose)
    process.on('uncaughtException', processError)

    // Middlewares
    setMiddlewares(app)

    // Routes
    setRoutes(app)

    // DataBase Connection
    await initConn()

    // Server
    app.listen(parameters.server.port, parameters.server.host, async () => {
      logger.info(`Server initialized. Proccess ID: ${process.pid}`)
      logger.info(
        `Server listening in: ${parameters.server.host}:${parameters.server.port}`,
      )
    })
  } catch (err: any) {
    logger.showError('Error launching server')
    logger.showError(err)
    processError(err)
  }
}

/* -------------------------------------------------------------------------- */
/*                                    START                                   */
/* -------------------------------------------------------------------------- */
if (require.main === module) init()
