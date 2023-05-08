import { Request, Response } from 'express'
import Logger from './logger'
import Parameters from './parameters'
import mongoose from 'mongoose'

export default class MongoConnector {
  private readonly parameters: Parameters = new Parameters()
  private readonly logger: Logger = new Logger()

  /**Opens a connection with the MongoDB database
   *
   */
  public async init() {
    try {
      this.logger.info('Starting Connection')

      await mongoose.connect(
        'mongodb+srv://root:root@cluster0.w7tn7ij.mongodb.net/CountMeApp?retryWrites=true&w=majority',
      )

      this.logger.info('Connection started sucessfully')
    } catch (error) {
      this.logger.error(error)
    }
  }

  /**MiddleWare for opening a connection with the MongoDB database
   *
   *
   */
  public initMW() {
    return async (req: Request, res: Response, next: Function) => {
      try {
        this.init()
        next()
      } catch (error) {}
    }
  }

  /**Closes the connection with the MongoDB database
   *
   */
  public async close() {
    try {
      this.logger.info('Closing Connection')

      await mongoose.disconnect()

      this.logger.info('Connection closed sucessfully')
    } catch (error) {
      this.logger.error(error)
    }
  }

  /**MiddleWare for closing the connection with the MongoDB database
   *
   *
   */
  public closeMW() {
    return async (req: Request, res: Response, next: Function) => {
      try {
        this.close()
        next()
      } catch (error) {}
    }
  }
}
