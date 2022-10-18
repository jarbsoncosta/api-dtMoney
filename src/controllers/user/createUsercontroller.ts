

import { CreateUserService } from '../../modules/user/createUserService'
import { Request, Response } from 'express'


export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerParams = req.body
    const service = new CreateUserService()
    const response = await service.execute(registerParams)
    return res.status(201).json(response)
  }
}