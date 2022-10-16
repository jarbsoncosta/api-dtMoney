import { Router } from 'express'
import transactionRoutes from './transaction.routes'
import userRoutes from './user.routes'

const routes = Router()


routes.use("/api/user", userRoutes)
routes.use("/api/transaction", transactionRoutes)






export default routes