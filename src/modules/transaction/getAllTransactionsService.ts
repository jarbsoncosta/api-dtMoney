import { prisma } from '@config/prisma';
import { Transaction } from '@prisma/client'
import AppError from '../../errors/AppError';



export class GetAllTransactionsService {
  async execute(userId:string): Promise<Transaction[]> {
    const userExists = await prisma.user.findFirst({ where: { id:userId} })
      if (!userExists) throw new AppError("User not found")
    
      const categoryItem = await prisma.transaction.findMany({
        where:{
          userId
        },
        orderBy:{
          createdAt: 'desc',
          
        },        

      })
      return categoryItem
 
  }
}