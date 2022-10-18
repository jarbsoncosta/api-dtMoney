
import { GetAllTransactionsService } from '../../modules/transaction/getAllTransactionsService'
import { Request, Response } from 'express'

export class GetAllTransactionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {id:userId}=req.user
      const service = new GetAllTransactionsService()
    const response = await service.execute(userId)
    return res.status(201).json(response)
  }
}