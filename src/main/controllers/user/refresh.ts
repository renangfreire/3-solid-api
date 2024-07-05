import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshController(req: FastifyRequest, reply: FastifyReply){
    await req.jwtVerify({
        onlyCookie: true
    })

    const token = await reply.jwtSign(
        {
            role: req.user.role
        }, 
        {
            sign: {
                sub: req.user.sub
        }
    })

    const refreshToken = await reply.jwtSign(
        {
            role: req.user.role
        }, 
        {
            sign: {
                sub: req.user.sub,
                expiresIn: "7d"
        }
    })

    return reply
    .status(200)
    .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true
    })
    .send({
        token
    });
}