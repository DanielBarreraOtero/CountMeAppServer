import Logger from './logger'
import Parameters from './parameters'
import mongoose, { Mongoose } from 'mongoose'

export default class MongoConnector {
  private readonly parameters: Parameters = new Parameters()
  private readonly logger: Logger = new Logger()

  public async init() {
    try {
      this.logger.info('Starting Connection')

      await mongoose.connect(
        'mongodb+srv://root:root@cluster0.mdqeaar.mongodb.net/CountMeApp?retryWrites=true&w=majority',
      )

      this.logger.info('Connection started sucessfully')
    } catch (error) {
      this.logger.error(error)
    }
  }

  public async close() {
    try {
      this.logger.info('Closing Connection')

      await mongoose.disconnect()

      this.logger.info('Connection closed sucessfully')
    } catch (error) {
      this.logger.error(error)
    }
  }
}
