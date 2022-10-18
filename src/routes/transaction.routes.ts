import { CreateNewTransactionController } from '../controllers/transaction/createNewTransactionController'
import { GetAllTransactionsController } from '../controllers/transaction/getAllTransactionsController'
import { Router } from 'express'
import { userAuthenticate } from '../middlewares/userAuthenticate'


const transactionRoutes = Router()

transactionRoutes.post('/', userAuthenticate, new CreateNewTransactionController().handle)
transactionRoutes.get('/', userAuthenticate, new GetAllTransactionsController().handle)



export default transactionRoutes