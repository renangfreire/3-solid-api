import { makeCreateGym } from "@/main/factories/makeCreateGym";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createGym(req: FastifyRequest, reply: FastifyReply){
    const gymBodySchema = z.object({
        title: z.string(), 
        description: z.string().optional(),
        phone: z.string().optional(),
        longitude: z.number().refine(value => Math.abs(value) <= 180),
        latitude: z.number().refine(value => Math.abs(value) <= 90)
    })

    const {title, description, latitude, longitude, phone} = gymBodySchema.parse(req.body)

    const createGymService = makeCreateGym()

    const { gym } = await createGymService.handle({
        latitude,
        longitude,
        title,
        description, 
        phone
    })

    return reply.status(201).send({
        gym
    });
}