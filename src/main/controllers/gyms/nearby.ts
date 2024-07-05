import { makeFetchNearByGyms } from "@/main/factories/makeFetchNearByGyms";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchNearByGym(req: FastifyRequest, reply: FastifyReply){
    const nearByQuerySchema = z.object({
        longitude: z.coerce.number().refine(value => Math.abs(value) <= 180),
        latitude: z.coerce.number().refine(value => Math.abs(value) <= 90),
        page: z.coerce.number().min(1).default(1)
    })

    const {latitude, longitude, page} = nearByQuerySchema.parse(req.query)

    const fetchNearByGymsService = makeFetchNearByGyms()
    
    const { gyms } = await fetchNearByGymsService.handle({
        page,
        userLat: latitude,
        userLong: longitude
    })
    
    return reply.status(200).send({
        gyms
    });
}