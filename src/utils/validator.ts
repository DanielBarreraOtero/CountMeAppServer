import { Request, Response } from 'express'
import Activity from '../modules/activity/models/Activity_model'
import User from '../modules/user/models/User_model'
import AuthChecker from './auth-checker'

export default class Validator {
  private authChecker: AuthChecker

  constructor(authChecker: AuthChecker) {
    this.authChecker = authChecker
  }

  public activityPut() {
    return async (req: Request, res: Response, next: Function) => {
      if (!req.body.activity.id) {
        res.status(400).json({
          error: `The body isn't well formated: no id was found.`,
        })
        return
      }

      var error = await this.activityPost()(req, res)
      if (error) return

      next()
    }
  }

  public activityPost() {
    return async (
      req: Request,
      res: Response,
      next?: Function,
    ): Promise<string | undefined> => {
      var error: string

      if (!req.body.activity) {
        error = `The body isn't well formated: no activity was found.`
        res.status(400).json({ error })
        return error
      }

      if (!req.body.activity.user || !req.body.activity.user.username) {
        error = `The body isn't well formated: user not found.`
        res.status(400).json({ error })
        return error
      }

      if (await this.authChecker.checkToken(req)) {
        const user = (await this.authChecker.getUserFromToken(req)) as User

        if (user.username !== req.body.activity.user.username) {
          error = `The body isn't well formated: user doesn't match authentication.`
          res.status(400).json({ error })
          return error
        }
      }

      if (!req.body.activity.color) {
        error = `The body isn't well formated: color not found.`
        res.status(400).json({ error })
        return error
      }

      if (!req.body.activity.name) {
        error = `The body isn't well formated: name not found.`
        res.status(400).json({ error })
        return error
      }

      next ? next() : null
    }
  }
}
