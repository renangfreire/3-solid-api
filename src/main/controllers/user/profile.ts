import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfile } from "@/main/factories/makeGetUserProfile";

export async function userProfile(req: FastifyRequest, reply: FastifyReply){
    const userId = req.user.sub

    const getUserProfile = makeGetUserProfile();

    const { user } = await getUserProfile.handle({ userId });

    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    });
}