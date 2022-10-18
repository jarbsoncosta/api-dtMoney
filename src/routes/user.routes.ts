
import { AuthenticateController } from '../controllers/user/authenticateController'
import { CreateUserController } from '../controllers/user/createUsercontroller'
import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/', new CreateUserController().handle)
userRoutes.post('/session', new AuthenticateController().handle)
// userRoutes.post('/forgot-password', new ForgotPasswordController().handle);

export default userRoutes
