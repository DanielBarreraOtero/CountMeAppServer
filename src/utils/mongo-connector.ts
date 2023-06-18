import Logger from './logger'
import Parameters from './parameters'
import mongoose from 'mongoose'

const parameters: Parameters = new Parameters()
const logger: Logger = new Logger()

/**Opens a connection with the MongoDB database
 *
 */
export const initConn = async () => {
  try {
    logger.info('Starting Connection')

    // await mongoose.connect(
    //   'mongodb+srv://root:root@cluster0.w7tn7ij.mongodb.net/CountMeApp?retryWrites=true&w=majority',
    // )
    await mongoose.connect(parameters.db.url)

    logger.info('Connection started sucessfully')
  } catch (error) {
    logger.error(error)
  }
}

/**Closes the connection with the MongoDB database
 *
 */
export const closeConn = async () => {
  try {
    logger.info('Closing Connection')

    await mongoose.disconnect()

    logger.info('Connection closed sucessfully')
  } catch (error) {
    logger.error(error)
  }
}
