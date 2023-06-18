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
      const user = await this.getUserFromToken(req)

      //If there is an authorization token and it is valid
      //  If the user is an Admin
      if (
        (await this.checkToken(req)) &&
        user instanceof User &&
        user.roles.find((role) => role === 'admin')
      ) {
        next()
      } else {
        res.status(401).send()
      }
    }
  }

  /**MiddleWare that checks that there is an user authorization token inside the request
   *
   * @returns
   */
  public authUser() {
    return async (req: Request, res: Response, next: Function) => {
      const user = await this.getUserFromToken(req)

      //If there is an authorization token and it is valid
      //  If the user is valid
      if ((await this.checkToken(req)) && user instanceof User) {
        next()
      } else {
        res.status(401).send()
      }
    }
  }

  public async checkToken(req: Request) {
    return (
      req.headers.authorization &&
      (await this.validateToken(req.headers.authorization))
    )
  }

  public async getUserFromToken(req: Request) {
    const repo = new GetUser()

    var id = (jwt.decode(req.headers.authorization) as jwt.JwtPayload)?.id

    // We find the user of that token
    return await repo.execute(id)
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
