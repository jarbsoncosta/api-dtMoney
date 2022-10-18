import 'dotenv/config'
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import AppError from './errors/AppError'
import cors from 'cors'
import routes from './routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 5000

// Tratamento de erros
app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }
    console.log(error)
    return response.status(500).json({
      status: 'error',
      message: 'Erro Interno do servidor'

    })
  }
)

app.listen(port, () => {
  console.log(`🚀 Server is running at ${port}`)
})
