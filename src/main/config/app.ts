import fastify from "fastify";	
import { appRoutes } from "../routes";
import fastifyJwt from "@fastify/jwt";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";

export const app = fastify()

app.register(fastifyCookie)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refreshToken",
        signed: false
    },  
    sign: {
        expiresIn: "1d",
    }
});

app.register(appRoutes);

app.setErrorHandler((error: any, _, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({ message: "Validation Error", issues: error.format()})
    }

    if(env.NODE_ENV !== "production"){
        console.error(error)
    } else {
        // TODO: adicionar integração com serviço de Logs ex: DataDog/NewRelic/Sentry
    }

    if(!error.status){
        return reply.status(500).send("Internal Server Error")
    }

    reply.status(error.status).send(error.body.message)
})