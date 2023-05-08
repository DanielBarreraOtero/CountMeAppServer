import { Request, Response } from 'express'
import Session from '../../utils/session'
import User from '../../modules/user/models/User_model'

export const sessionLogIn = async (req: Request, res: Response) => {
  const session = new Session()
  var credentials = req.body.user
  var result: { ok: boolean; user?: User; token?: string }

  // If ther is a token we try to log in that way
  if (req.body.token) {
    result = await session.loginWithToken(req.body.token)
    // If not, then we try the credentials
  } else if (credentials.username && credentials.password) {
    result = await session.loginWithCredentials(
      credentials.username,
      credentials.password,
    )
  } else {
    // If there is no token and no credentials, return error
    res.status(400).json('Incomplete credentials')
    return
  }

  // If we logged in successfully
  if (result.ok) {
    // return the user and a token
    res.status(200).json({
      ok: true,
      message: 'Login Completed',
      user: result.user,
      token: result.token,
    })
  } else {
    res.status(401).json('Invalid Credentials')
  }
}
