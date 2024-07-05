import { makeValidateCheckIn } from "@/main/factories/makeValidateCheckin";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validateCheckIn(req: FastifyRequest, reply: FastifyReply){
    const createCheckInParamsSchema = z.object({
       checkInId: z.string().uuid(),
    })
    
    const { checkInId } = createCheckInParamsSchema.parse(req.params)

    const validateCheckInService = makeValidateCheckIn()

    const { checkInValidated } = await validateCheckInService.handle({
        checkInId,
    })

    return reply.status(200).send({
        checkInValidated
    });
}