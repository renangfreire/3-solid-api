import { unauthorized } from "@/services/helpers/HTTPHelpers";
import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(req: FastifyRequest, reply: FastifyReply){
    try{
        await req.jwtVerify()
    } catch(error: any){
        throw unauthorized(error)
    }
}