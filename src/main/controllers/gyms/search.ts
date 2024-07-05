import { makeSearchGym } from "@/main/factories/makeSearchGyms";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchGym(req: FastifyRequest, reply: FastifyReply){
    const gymParamsSchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const {query, page} = gymParamsSchema.parse(req.query)

    const searchGymService = makeSearchGym()

    const { gyms } = await searchGymService.handle({
        page,
        query
    })

    return reply.status(200).send({
        gyms
    });
}