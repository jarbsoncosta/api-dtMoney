import { prisma } from '@config/prisma'
import { User } from '@prisma/client';


import { hash } from 'bcrypt'
import AppError from 'src/errors/AppError'

type RequestParams = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

export class CreateUserService {
  async execute ({ name, email, password, confirmPassword }: RequestParams): Promise<User> {
    const emailAlreadyInuse = await prisma.user.findFirst({ where: { email } })
    if (emailAlreadyInuse) throw new AppError('Já existe um usuário cadastrado com este E-MAIL')

    if (String(confirmPassword) !== String(password)) {
      throw new AppError('Confirmação de senha não confere!')
    }

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword

      }
    })

    return user
  }
}
