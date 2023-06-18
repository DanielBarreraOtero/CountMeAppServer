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
  readonly db: {
    url: string
  }
  readonly token: {
    key: string
  }

  constructor() {
    this.server = this.readServer()
    this.db = this.readDb()
    this.token = this.readToken()
  }

  private readServer(): any {
    return {
      host: process.env.ENV_SERVER_HOST || '0.0.0.0',
      port: process.env.ENV_SERVER_PORT
        ? Number(process.env.ENV_SERVER_PORT)
        : 3000,
    }
  }

  private readDb(): any {
    return {
      url:
        process.env.ENV_DB_URL ||
        'mongodb+srv://root:root@cluster0.w7tn7ij.mongodb.net/CountMeApp?retryWrites=true&w=majority',
    }
  }

  private readToken(): any {
    return {
      key: process.env.ENV_TOKEN_KEY || 'clavesecretadetoken',
    }
  }
}
