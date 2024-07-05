import { unauthorized } from "@/services/helpers/HTTPHelpers";
import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: "MEMBER" | "ADMIN"){
    return async (req: FastifyRequest, reply: FastifyReply) => {
        const { role } = req.user

        if(role !== roleToVerify){
            throw unauthorized(new Error())
        }
    }
} 