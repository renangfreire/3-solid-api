import { makeRegisterService } from "@/main/factories/makeRegisterService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerUserController(req: FastifyRequest, reply: FastifyReply){
    const registerUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const data = registerUserSchema.parse(req.body);

    // Principio D - Passando as dependencias para o Serviço
    const registerUserService = makeRegisterService();

    await registerUserService.handle(data);

    return reply.status(201).send();
}