import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import GetUser from '../modules/user/application/get-one'
import User from '../modules/user/models/User_model'
import GetUserTokenByToken from '../modules/user/application/tokens/get-by-token'
import UserToken from '../modules/user/models/UserToken_model'

export default class AuthChecker {
  /**MiddleWare that checks that there is an admind authorization token inside the request
   *
   * @returns
   */
  public authAdmin() {
    return async (req: Request, res: Response, next: Function) => {
      const repo = new GetUser()

      //If there is an authorization token and it is valid
      if (
        req.headers.authorization &&
        this.validateToken(req.headers.authorization)
      ) {
        // We find the user of that token
        const user = await repo.execute(
          jwt.decode(req.headers.authorization) as string,
        )

        //  If the user is an Admin
        if (
          user instanceof User &&
          user.roles.find((role) => role === 'admin')
        ) {
          next()
        } else {
          res.status(401).send()
        }
      } else {
        res.status(401).send()
      }
    }
  }

  /**Validates that a token exist in the users_tokens Collection in the data base
   *
   * @param token
   * @returns
   */
  public async validateToken(token: string) {
    const getToken = new GetUserTokenByToken()

    var result = await getToken.execute(token)

    return result instanceof UserToken
  }
}
