import { Express } from 'express'
import v1 from './v1/index'

export default function setRoutes(app: Express) {
  app.use('/v1', v1)
  app.use('/health', (req, res) => {
    res.status(200).send()
  })
}
