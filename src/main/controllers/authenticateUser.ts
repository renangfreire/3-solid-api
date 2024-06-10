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

    await authenticateUserService.handle(data);

    return reply.status(200).send();
}