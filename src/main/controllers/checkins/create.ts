import { makeCheckInService } from "@/main/factories/makeCheckInService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createCheckIn(req: FastifyRequest, reply: FastifyReply){
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid(),
    })
    
    const createCheckInBodySchema = z.object({
        longitude: z.number().refine(value => Math.abs(value) <= 180),
        latitude: z.number().refine(value => Math.abs(value) <= 90)
    })

    const { gymId } = createCheckInParamsSchema.parse(req.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

    const createCheckInService = makeCheckInService()

    const { checkIn } = await createCheckInService.handle({
        userId: req.user.sub,
        gymId,
        userLat: latitude,
        userLong: longitude,
    })

    return reply.status(201).send({
        checkIn
    });
}