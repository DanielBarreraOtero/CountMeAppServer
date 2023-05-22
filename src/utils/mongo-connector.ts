import { Request, Response } from 'express'
import Logger from './logger'
import Parameters from './parameters'
import mongoose from 'mongoose'

const parameters: Parameters = new Parameters()
const logger: Logger = new Logger()

export default class MongoConnector {
  private readonly parameters: Parameters = new Parameters()
  private readonly logger: Logger = new Logger()

  /**MiddleWare for opening a connection with the MongoDB database
   *
   *
   */
  public initMW() {
    return async (req: Request, res: Response, next: Function) => {
      try {
        // await this.init()
        next()
      } catch (error) {}
    }
  }

  /**MiddleWare for closing the connection with the MongoDB database
   *
   *
   */
  public closeMW() {
    return async (req: Request, res: Response, next: Function) => {
      try {
        // this.close()
        next()
      } catch (error) {}
    }
  }
}

/**Opens a connection with the MongoDB database
 *
 */
export const initConn = async (req: Request, res: Response, next: Function) => {
  try {
    logger.info('Starting Connection')

    await mongoose.connect(
      'mongodb+srv://root:root@cluster0.w7tn7ij.mongodb.net/CountMeApp?retryWrites=true&w=majority',
    )

    logger.info('Connection started sucessfully')
    next()
  } catch (error) {
    logger.error(error)
  }
}

/**Closes the connection with the MongoDB database
 *
 */
export const closeConn = async (req: Request, res: Response, next: Function) => {
  try {
    logger.info('Closing Connection')

    await mongoose.disconnect()

    logger.info('Connection closed sucessfully')
    next()
  } catch (error) {
    logger.error(error)
  }
}
