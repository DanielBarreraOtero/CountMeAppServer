import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({
  path: path.resolve(
    process.cwd(),
    `config/${process.env.NODE_ENV || 'prod'}.env`,
  ),
})

export default class Parameters {
  readonly server: {
    host: string
    port: number
  }

  constructor() {
    this.server = this.readServer()
  }

  private readServer(): any {
    return {
      host: process.env.ENV_SERVER_HOST || '0.0.0.0',
      port: process.env.ENV_SERVER_PORT
        ? Number(process.env.ENV_SERVER_PORT)
        : 3000,
    }
  }
}
