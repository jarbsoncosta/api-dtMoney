
import { AuthenticateService } from '@modules/user/authenticateService'
import { Request, Response } from 'express'

export class AuthenticateController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const service = new AuthenticateService()

    const response = await service.execute({ email, password })

    return res.status(200).json(response)
  }
}
