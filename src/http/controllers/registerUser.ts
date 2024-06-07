import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUserService } from "@/services/registerUser";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerUserController(req: FastifyRequest, reply: FastifyReply){
    const registerUserSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
    })

    const data = registerUserSchema.parse(req.body);

    // Principio D - Passando as dependencias para o Serviço
    const userRepository = new PrismaUserRepository();
    const registerUserService = new RegisterUserService(userRepository);

    await registerUserService.handle(data);

    return reply.status(201).send();
}