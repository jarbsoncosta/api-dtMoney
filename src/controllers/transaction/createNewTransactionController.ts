import { CreateNewTransactionService } from '@modules/transaction/createNewTransactionService'
import { Request, Response } from 'express'


export class CreateNewTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const registerParams = req.body
    const service = new CreateNewTransactionService()
    const response = await service.execute({ ...registerParams, userId })
    return res.status(201).json(response)
  }
}