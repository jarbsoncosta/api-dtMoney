
import { prisma } from "@config/prisma";
import AppError from "../../errors/AppError";
import { compare } from "bcrypt";
import { Secret, sign } from 'jsonwebtoken';



type AuthenticationParams = {
  password: string;
  email: string;
};

type AuthenticationResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
};

export class AuthenticateService {
  async execute(authenticateParams: AuthenticationParams): Promise<AuthenticationResponse> {
    const { email, password } = authenticateParams;

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        }
      }
    })

    if (!user) {
      throw new AppError("Não autorizado", 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Não autorizado", 401);
    }

    const token = sign({}, process.env.JWT_SECRET as Secret, {
			subject: user.id,
			expiresIn: process.env.JWT_EXPIRES_IN
		});

    const tokenReturn: AuthenticationResponse = {
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
			token
		};

		return tokenReturn;

  }
}