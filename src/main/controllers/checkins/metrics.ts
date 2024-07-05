import { makeGetUserMetrics } from "@/main/factories/makeGetUserMetrics";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserMetrics(req: FastifyRequest, reply: FastifyReply){
    const getUserMetricsService = makeGetUserMetrics()

    const { checkInsCount } = await getUserMetricsService.handle({
        userId: req.user.sub
    })

    return reply.status(200).send({
        checkInsCount
    });
}