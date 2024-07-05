import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUserService } from "@/services/authenticateUser";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateUserController(req: FastifyRequest, reply: FastifyReply){
    const authenticateUserSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const data = authenticateUserSchema.parse(req.body);

    // Principio D - Passando as dependencias para o Serviço
    const userRepository = new PrismaUserRepository();
    const authenticateUserService = new AuthenticateUserService(userRepository);

    const { user } = await authenticateUserService.handle(data);

    const token = await reply.jwtSign(
        {
            role: user.role
        }, 
        {
            sign: {
                sub: user.id,
        }
    })

    const refreshToken = await reply.jwtSign(
        {
            role: user.role
        }, 
        {
            sign: {
                sub: user.id,
                expiresIn: "7d"
        }
    })

    return reply
    .status(200)
    .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true
    })
    .send({
        token
    });
}