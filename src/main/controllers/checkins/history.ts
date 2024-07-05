import { makeFetchUserCheckInsHistory } from "@/main/factories/makeFetchUserCheckinsHistory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getUserHistory(req: FastifyRequest, reply: FastifyReply){
    const checkInsHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const {page} = checkInsHistoryQuerySchema.parse(req.query)

    const userCheckInsHistoryService = makeFetchUserCheckInsHistory()

    const { checkIns } = await userCheckInsHistoryService.handle({
        page,
        userId: req.user.sub
    })

    return reply.status(200).send({
        checkIns
    });
}