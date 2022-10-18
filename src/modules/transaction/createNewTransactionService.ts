
import { prisma } from '@config/prisma'
import { Transaction } from '@prisma/client'
import AppError from 'src/errors/AppError'

interface RequestTransaction {
    userId: string
    description: string
    type: string
    category: string
    price: number
    createdAt: string
  }

export class CreateNewTransactionService {
  async execute ({ description, type, category, price, userId }: RequestTransaction): Promise<Transaction> {
    const userExists = await prisma.user.findFirst({ where: { id: userId } })
    if (!userExists) throw new AppError('User not found')
    try {
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          category,
          description,
          type,
          price
        }
      })
      return transaction
    } catch (error) {
      throw new AppError(error)
    }
  }
}
