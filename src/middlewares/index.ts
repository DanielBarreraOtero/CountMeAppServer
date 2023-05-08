import express, { Express } from 'express'
import * as fs from 'fs'
import helmet, { crossOriginOpenerPolicy } from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'

export default function setMiddlewares(app: Express) {
  // Default HTTP Header configuration
  app.use(helmet())
  // Response compression
  app.use(compression())
  // Content-Type configuration
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ extended: false }))
  // HTTP Requests monitoring
  app.use(
    morgan('combined', {
      stream: fs.createWriteStream(process.cwd() + '/logs/access.log', {
        flags: 'a',
      }),
    }),
  )

  app.use(
    cors({
      origin: 'http://localhost:4200',
      credentials: true
    }),
  )

  // Cookie Access
  app.use(cookieParser())
  app.use(morgan('dev'))
}
